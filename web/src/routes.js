import { getRoutes, createRoute, removeRoute } from "./api.js";
import { toast } from "@moaqzdev/toast/utils";
import "active-table";
import '@jsfe/shoelace';

export async function initRoutes(container) {
  container.innerHTML = `
    <h2>Routes</h2>
    <div id="routes-table">
    </div>
    <div id="routes-form">
    </div>
  `;

  const formSchema = {
    title: "",
    description: "Add new bus route",
    properties: {
        "Route ID": {
            type: "number"
        },
        Time: {
            type: "string"
        },
        "Stop ID": {
            type: "string"
        }
    }
  };
  const formEl = document.createElement("jsf-shoelace");
  formEl.schema = formSchema;
  formEl.submitCallback = async (newData, valid) => {
    console.info({ newData, valid });
    try {
      await createRoute(newData["Route ID"], newData["Time"], newData["Stop ID"]);
      toast.success({ title: "Success", description: "Route created successfully", duration: 10000 });
      await renderTable();
    } catch (err) {
      toast.error({ title: "Error", description: err.message, duration: 10000 });
    }
  };
  document.getElementById("routes-form").appendChild(formEl);

  async function renderTable() {
    const routes = await getRoutes();

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
      ["ID", "Route ID", "Time", "Stop ID"],
      ...routes.map((s) => [String(s.id), String(s.route_id), s.time, String(s.stop_id)]),
    ];
    let lastIDs = [];
    table.onDataUpdate = async (dataUpdate) => {
      console.log(dataUpdate);

      let IDs = [];
      dataUpdate.forEach((x) => IDs.push(x[0]));
      lastIDs.forEach(async (x) => {
        if (!IDs.includes(x)) {
          try {
            await removeRoute(x);
            toast.success({ title: "Success", description: "Route removed successfully", duration: 10000 });
          } catch (err) {
            toast.error({ title: "Error", description: err.message, duration: 10000 });
          }
        }
      });

      lastIDs = [];
      dataUpdate.forEach((x) => lastIDs.push(x[0]));
    };

    const tableContainer = document.getElementById("routes-table");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
  }

  await renderTable();
}
