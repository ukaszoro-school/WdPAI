import {
  checkUser,
  getUsers,
  getRoutes,
  getStops,
  getUserDuties,
  assignDuty,
  removeUser,
} from "./api.js";
import { toast } from "@moaqzdev/toast/utils";
import "active-table";
import "@jsfe/shoelace";

export async function initHome(container) {
  container.innerHTML = `
    <h2>Welcome to Fleet Manager</h2>
    <h3 id="user-info"></h3>
    <div id="home-form"></div>
    <div id="driver-routes"></div>
  `;

  let resp = await checkUser();
  if (!resp?.logged_in) {
    location.reload();
    return;
  }
  const userData = resp.user;

  document.getElementById("user-info").innerText =
    `You are logged in as ${userData.username} (${userData.roles.join(", ")})`;

  if (userData.roles.includes("admin")) {
    // Admin view
    await adminPanel();
  } else if (userData.roles.includes("driver")) {
    // Driver view
    await driverPanel(userData);
  }
}

async function driverPanel(userData) {
  const [duties, routes, stops] = await Promise.all([
    getUserDuties(userData.id),
    getRoutes(),
    getStops(),
  ]);

  const assigned = routes
    .filter((r) => duties.some((d) => d === r.route_id))
    .map((r) => {
      r.location = stops.find((s) => s.id == r.stop_id).location;
      return r;
    });

  console.log(assigned);

  const div = document.getElementById("driver-routes");
  div.innerHTML = `
      <h3>Your Assigned Routes</h3>
      <ul>
        ${assigned.map((r) => `<li>Route ${r.route_id} at ${r.time} (${r.location}) </li>`).join("")}
      </ul>
    `;
}

async function adminPanel() {
  let [users, routes] = await Promise.all([getUsers(), getRoutes()]);

  if (users.length == 1) {
    document.getElementById("home-form").innerText =
      `Please add at least one driver to configure duties.`;
    return;
  }

  const formSchema = {
    title: "Assign Routes to Drivers",
    type: "object",
    properties: {},
  };

  for (const user of users) {
    if (!user.roles.includes("driver")) continue;

    const duties = await getUserDuties(user.id);

    formSchema.properties[user.username] = {
      title: user.username,
      description: "Assign routes to this driver",
      type: "object",
      properties: {
        Routes: {
          title: "Routes",
          type: "array",
          uniqueItems: true,
          default: duties,
          items: {
            type: "string",
            enum: [...new Set(routes.map((r) => r.route_id))],
          },
        },
        Checkbox: {
          title: "Delete User",
          type: "boolean",
          description: "Warning: this cannot be undone.",
        },
      },
    };
  }

  const uiSchema = {};
  for (const user of users) {
    if (!user.roles.includes("driver")) continue;
    uiSchema[user.username] = { Routes: { "ui:widget": "select" } };
  }

  const formEl = document.createElement("jsf-shoelace");
  formEl.schema = formSchema;
  formEl.uiSchema = uiSchema;
  formEl.submitButtonLabel = "Save";
  formEl.submitCallback = async (newData, valid) => {
    if (!valid) {
      toast.error({
        title: "Invalid",
        description: "Please fix the errors",
        duration: 10000,
      });
      return;
    }
    try {
      for (const [username, userObj] of Object.entries(newData)) {
        console.log(username, userObj);

        const driver = users.find((u) => u.username === username);
        if (!driver) continue;

        console.log("id:", driver.id);

        if (!!userObj.Checkbox) {
          await removeUser(driver.id);
          continue;
        }

        // overwrite duties for all drivers
        const current = await getUserDuties(driver.id);
        console.log("current", current);
        for (const d of current) {
          if (!userObj.Routes.includes(d)) {
            await assignDuty(driver.id, d, "delete");
          }
        }
        for (const r of userObj.Routes) {
          if (!current.some((d) => d.route_id === r)) {
            await assignDuty(driver.id, r, "post");
          }
        }
      }
      toast.success({
        title: "Success",
        description: "Assignments saved",
        duration: 10000,
      });
    } catch (err) {
      toast.error({
        title: "Error",
        description: err.message,
        duration: 10000,
      });
    }
  };

  document.getElementById("home-form").appendChild(formEl);
}
