import { getLines } from "./api.js";
import { toast } from "@moaqzdev/toast/utils";
import "active-table";
import "@jsfe/material";

export async function initLines(container) {
  container.innerHTML = `
    <h2>Lines</h2>
    <div id="lines-container"></div>
  `;

  async function renderTables() {
    const lines = await getLines();
    const containerEl = document.getElementById("lines-container");
    containerEl.innerHTML = "";

    lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("line-wrapper");
      wrapper.style.marginBottom = "2rem";

      // Add line heading
      const heading = document.createElement("h3");
      heading.textContent = `Line ${line.id}`;
      wrapper.appendChild(heading);

      const table = document.createElement("active-table");
      table.isCellTextEditable = false;
      table.displayAddNewColumn = false;
      table.displayAddNewRow = false;
      table.columnDropdown = {
        displaySettings: { isAvailable: true },
        isSortAvailable: true,
        isDeleteAvailable: false,
        isInsertLeftAvailable: false,
        isInsertRightAvailable: false,
        isMoveAvailable: false,
      };
      table.rowDropdown = { displaySettings: { isAvailable: false } };
      table.frameComponentsStyles = { style: { hoverColors: { backgroundColor: "white" } } };
      table.headerStyles = { hoverColors: { backgroundColor: "white" } };
      table.tableStyle = { borderRadius: "2px", width: "100%" };

      // pack
      const rows = [];
      line.stops.forEach((stop) => {
        stop.times.forEach((time) => {
          rows.push([String(stop.id), stop.location, time]);
        });
      });

      table.data = [
        ["Stop ID", "Location", "Time"],
        ...rows,
      ];

      wrapper.appendChild(table);
      containerEl.appendChild(wrapper);
    });
  }

  await renderTables();
}
