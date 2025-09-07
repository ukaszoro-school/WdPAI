import { login } from "./api.js";
import { toast } from "@moaqzdev/toast/utils";
import { initRegister } from "./register.js";
import "active-table";
import "@jsfe/shoelace";

export async function initLogin(container) {
  container.style.marginLeft = "auto";
  container.style.marginRight = "auto";
  container.style.marginTop = "100px";
  container.style.maxWidth = "500px";
  container.innerHTML = `
    <div id="login-form">
    </div>
  `;

  const formSchema = {
    title: "Fleet Manager 🚌",
    description: "",
    properties: {
      Name: {
        type: "string",
      },
      Password: {
        type: "string",
      },
    },
  };
  const uiSchema = {
    Password: {
      "ui:widget": "password",
    },
  };
  const formEl = document.createElement("jsf-shoelace");
  formEl.schema = formSchema;
  formEl.uiSchema = uiSchema;
  formEl.submitButtonLabel = "Login";
  formEl.submitCallback = async (newData, valid) => {
    console.info({ newData, valid });
    try {
      const resp = await login(newData.Name, newData.Password);
      localStorage.setItem("sessionToken", resp?.token);
      toast.success({
        title: "Success",
        description: "Logged in successfully",
        duration: 10000,
      });
      location.reload();
    } catch (err) {
      toast.error({
        title: "Error",
        description: err.message,
        duration: 10000,
      });
    }
  };

  const hint = document.createElement("div");
  hint.innerHTML = `
  Don't have an account? Register <div style="display: inline-block; color: blue; cursor: pointer">here</div>.
  `;

  let once = false;
  hint.onclick = async () => {
    hint.onclick = null;
    if (!once) {
      once = true;
      await initRegister(container);
    }
  };

  document.getElementById("login-form").appendChild(formEl);
  document.getElementById("login-form").appendChild(hint);
}
