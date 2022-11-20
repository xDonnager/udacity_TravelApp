//js
import { generateButtonHandler, generateButtonOnSubmitHandler } from "./js/form";
import { generateBtn } from "./js/constants";
//styles
import "./styles/app.scss";
import "./styles/form.scss";
//import "./styles/reset.scss";

window.addEventListener("DOMContentLoaded", () => {
  
  generateButtonHandler()

  generateBtn.addEventListener("click", generateButtonOnSubmitHandler)
  
});
