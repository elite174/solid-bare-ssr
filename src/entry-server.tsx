import { HydrationScript, } from "solid-js/web";

sharedConfig

import App from "./App";
import { sharedConfig } from "solid-js";

const ServerApp = () => (
  <html>
    <head>
      {(__ASSETS__ as string[]).map((asset) => (
        <link rel="stylesheet" href={asset} />
      ))}
      <HydrationScript />
    </head>
    <body>
      <div id="root">
        <App />
      </div>
      {(__SCRIPTS__ as string[]).map((src) => (
        <script type="module" src={src}></script>
      ))}
    </body>
  </html>
);

export default ServerApp;
