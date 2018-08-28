import ReactDOM from "react-dom";
import routes from "./config/routes"; 

// Note: should be places in separte file main.css
import "./styles/colors.css";
import "./styles/indent.css";
import "./styles/button.css";
import "./styles/form.css";
import "./styles/common.css";

import "./index.css";

ReactDOM.render(
    routes, 
    document.getElementById("root")
);