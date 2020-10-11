const parsenv = require("../src");
const p = require("path");

parsenv.config();

parsenv.edit({ NAME: "NAME CHANGED", ANOTHER_VARIABLE: "BAZ" });

parsenv.write({ path: p.join(__dirname, "../.env.modified") });
