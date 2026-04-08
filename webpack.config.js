import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    filename: "js/main.js",
    path: path.resolve(__dirname, "dist"),
    // clean: true,
  },
  // mode: "production",
  devServer: {
    hot: true,
    static: {
      directory: './dist',
      watch: true
    }
  }
};
