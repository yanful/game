import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

module.exports = {
  input: "index.js",
  output: {
    dir: "dist",
  },
  plugins: [
    copy({
      targets: [{ src: "index.html", dest: "dist" }, { src: "style.css", dest: "dist" }, { src: "Capture1.png", dest: "dist" }, { src: "Capture3.png", dest: "dist" }, { src: "Capture4.png", dest: "dist" }, { src: "node_modules", dest: "dist" }]
    }),
    nodeResolve(),
  ],
};