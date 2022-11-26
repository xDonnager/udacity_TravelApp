//js
import {
  generateButtonHandler,
  generateButtonOnSubmitHandler,
} from "./js/form";
import { generateBtn } from "./js/constants";
//styles
import "./styles/reset.scss";
import "./styles/app.scss";
import "./styles/form.scss";
import "./styles/trips.scss";
import "./styles/headerAndfooter.scss";

window.addEventListener("DOMContentLoaded", () => {
  generateButtonHandler();

  generateBtn.addEventListener("click", generateButtonOnSubmitHandler);
});
