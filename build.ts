import { defineConfig, build } from "vite";
import solid from "vite-plugin-solid";

const clientConfig = defineConfig({
  plugins: [
    solid({
      ssr: false,
      solid: {
        generate: "dom",
        hydratable: true,
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: "./src/entry-client.tsx",
      output: {
        dir: "dist/client",
      },
    },
  },
});

const serverConfig = ({ scripts, assets }: { scripts: string[]; assets: string[] }) =>
  defineConfig({
    plugins: [
      solid({
        ssr: true,
        solid: {
          generate: "ssr",
          hydratable: false,
        },
      }),
    ],
    define: {
      __SCRIPTS__: JSON.stringify(scripts),
      __ASSETS__: JSON.stringify(assets),
    },
    build: {
      minify: false,
      emptyOutDir: true,
      ssr: true,
      rollupOptions: {
        external: ["bun"],
        input: "./src/solid-server.ts",
        output: {
          dir: "dist/server",
          format: "esm",
          entryFileNames: "[name].js", // Keep original entry filenames
          chunkFileNames: "[name].js", // Keep original chunk filenames
          assetFileNames: "[name].[ext]", // Keep original asset filenames
        },
      },
    },
  });

await build(clientConfig).then((result) => {
  if ("output" in result) {
    const { output } = result,
      scripts: string[] = [],
      assets: string[] = [];

    output.forEach((chunk) => {
      chunk.fileName.endsWith(".js") && scripts.push(chunk.fileName);
      chunk.fileName.endsWith(".css") && assets.push(chunk.fileName);
    });

    return build(serverConfig({ scripts, assets }));
  }
});
