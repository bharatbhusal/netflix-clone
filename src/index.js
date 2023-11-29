import {
    createRoot
} from "react-dom/client"
import App from "./App"

const divContainer = document.getElementById("root")
const root = createRoot(divContainer)
root.render(< App />)