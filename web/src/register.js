import { createUser } from "./api.js";
import { toast } from "@moaqzdev/toast/utils";
import "active-table";
import "@jsfe/shoelace";

export async function initRegister(container) {
  container.style.marginLeft = "auto";
  container.style.marginRight = "auto";
  container.style.marginTop = "100px";
  container.style.maxWidth = "500px";
  container.innerHTML = `
    <div id="register-form">
    </div>
  `;

  const formSchema = {
    title: "",
    description: "Register",
    properties: {
        Name: {
            type: "string"
        },
        Password: {
            type: "string"
        },
        "Password (Repeat)": {
            type: "string"
        }
    }
  };
  const uiSchema = {
    "Password": {
      "ui:widget": "password"
    },
    "Password (Repeat)": {
      "ui:widget": "password"
    }
  }
  const formEl = document.createElement("jsf-shoelace");
  formEl.schema = formSchema;
  formEl.uiSchema = uiSchema;
  formEl.submitButtonLabel = "Register";
  formEl.submitCallback = async (newData, valid) => {
    console.info({ newData, valid });
    if (newData["Password"] !== newData["Password (Repeat)"]) {
      toast.error({ title: "Error", description: "Error: Passwords do not match!", duration: 10000 });
      return;
    }
    try {
      await createUser(newData.Name, newData.Password);
      toast.success({ title: "Success", description: "Registration completed successfully", duration: 10000 });
      location.reload()
    } catch (err) {
      toast.error({ title: "Error", description: err.message, duration: 10000 });
    }
  };

  const hint = document.createElement("div");
  hint.innerHTML = `
  Don't have an account? Register <a href='#register'>here</a>.
  `;
  hint.onclick = () => document.getElementById("register-form").remove();
  document.getElementById("register-form").appendChild(formEl);
  document.getElementById("register-form").appendChild(hint);
}
