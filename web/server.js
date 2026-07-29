const { createServer } = require("http");
const { parse } = require("url");

process.env.NODE_ENV = process.env.NODE_ENV || "production";

let next;
try {
  next = require("next");
} catch (e) {
  const path = require("path");
  const nodeVersion = process.version.replace(/^v/, "").split(".")[0];
  const venvModules = path.resolve(
    __dirname,
    "..",
    "..",
    "nodevenv",
    "Invexal-website",
    "web",
    nodeVersion,
    "lib",
    "node_modules"
  );
  require("module").globalPaths.push(venvModules);
  next = require("next");
}

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(port, "0.0.0.0", () => {
    console.log(`> Invexal ready on port ${port}`);
  });
}).catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
