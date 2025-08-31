import { login } from "./api.js";
import { toast } from "@moaqzdev/toast/utils";
import "active-table";
import '@jsfe/material';

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
    title: "",
    description: "Login",
    properties: {
        Name: {
            type: "string"
        },
        Password: {
            type: "string"
        }
    }
  };
  const uiSchema = {
    "Password": {
      "ui:widget": "password"
    }
  }
  const formEl = document.createElement("jsf-material");
  formEl.schema = formSchema;
  formEl.uiSchema = uiSchema;
  formEl.submitButtonLabel = "Login";
  formEl.submitCallback = async (newData, valid) => {
    console.info({ newData, valid });
    try {
      await login(newData.Name, newData.Password);
      toast.success({ title: "Success", description: "Logged in successfully", duration: 10000 });
      location.reload()
    } catch (err) {
      toast.error({ title: "Error", description: err.message, duration: 10000 });
    }
  };

  const hint = document.createElement("div");
  hint.innerHTML = `
  Don't have an account? Register <a href='#register'>here</a>.
  `;
  hint.onclick = () => document.getElementById("login-form").remove();
  document.getElementById("login-form").appendChild(hint);
  document.getElementById("login-form").appendChild(formEl);
}


