import { serve, file } from "bun";
import { renderToStringAsync } from "solid-js/web";

import ServerApp from "./entry-server";

serve({
  async fetch(req) {
    if (req.url.endsWith(".js")) {
      const url = new URL(req.url);

      return new Response(await file(`./dist/client${url.pathname}`).bytes(), {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    }

    if (req.url.endsWith(".css")) {
      const url = new URL(req.url);

      return new Response(await file(`./dist/client${url.pathname}`).bytes(), {
        headers: {
          "Content-Type": "text/css",
        },
      });
    }

    const html = await renderToStringAsync(ServerApp);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  port: 3000,
});
