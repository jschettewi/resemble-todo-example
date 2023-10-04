import {
  ResembleClient,
  ResembleClientProvider,
} from "@reboot-dev/resemble-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
// Use TLS (via localhost.direct) so we get the advantage of HTTP/2
// multiplexing.
const client = new ResembleClient("https://localhost.direct:9991");

root.render(
  <ResembleClientProvider client={client}>
    <App />
  </ResembleClientProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
