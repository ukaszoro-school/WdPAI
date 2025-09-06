import { getStops, createStop, removeStop } from "./api.js";
import { toast } from "@moaqzdev/toast/utils";
import "active-table";
import '@jsfe/shoelace';

export async function initStops(container) {
  container.innerHTML = `
    <h2>Stops</h2>
    <div id="stops-table">
    </div>
    <div id="stops-form">
    </div>
  `;

  const formSchema = {
    title: "",
    description: "Add new bus stop",
    properties: {
        Location: {
            type: "string"
        }
    }
  };
  const formEl = document.createElement("jsf-shoelace");
  formEl.schema = formSchema;
  formEl.submitCallback = async (newData, valid) => {
    console.info({ newData, valid });
    try {
      await createStop(newData.Location);
      toast.success({ title: "Success", description: "Stop created successfully", duration: 10000 });
      await renderTable();
    } catch (err) {
      toast.error({ title: "Error", description: err.message, duration: 10000 });
    }
  };
  formEl.data = {
    Location: "Stop location"
  };
  document.getElementById("stops-form").appendChild(formEl);

  async function renderTable() {
    const stops = await getStops();

    const table = document.createElement("active-table");
    table.isCellTextEditable = false;
    table.displayAddNewColumn = false;
    table.displayAddNewRow = false;
    table.columnDropdown = {
      displaySettings: {"isAvailable": true },
      isSortAvailable: true,
      isDeleteAvailable: false,
      isInsertLeftAvailable: false,
      isInsertRightAvailable: false,
      isMoveAvailable: false
    };
    table.rowDropdown = {
      displaySettings: {"isAvailable": true },
      isInsertUpAvailable: false,
      isInsertDownAvailable: false,
      isMoveAvailable: false,
      isDeleteAvailable: true,
      canEditHeaderRow: false
    };
    table.frameComponentsStyles = {"style": {"hoverColors": {"backgroundColor": "white"}}};
    table.headerStyles = {"hoverColors": {"backgroundColor": "white"}};
    table.tableStyle =  {"borderRadius":"2px",  "width":"100%"};
    table.data = [
      ["ID", "Location"],
      ...stops.map((s) => [String(s.id), s.location]),
    ];
    let lastIDs = [];
    table.onDataUpdate = async (dataUpdate) => {
      console.log(dataUpdate);

      let IDs = [];
      dataUpdate.forEach((x) => IDs.push(x[0]));
      lastIDs.forEach(async (x) => {
        if (!IDs.includes(x)) {
          try {
            await removeStop(x);
            toast.success({ title: "Success", description: "Stop removed successfully", duration: 10000 });
          } catch (err) {
            toast.error({ title: "Error", description: err.message, duration: 10000 });
          }
        }
      });

      lastIDs = [];
      dataUpdate.forEach((x) => lastIDs.push(x[0]));
    };

    const tableContainer = document.getElementById("stops-table");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
  }

  await renderTable();
}

