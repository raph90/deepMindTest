import "../css/main.scss";
import Controller from "./controller/Controller";

// App entry point
(() => {
  const controller = new Controller();
  controller.initalise();
})();
