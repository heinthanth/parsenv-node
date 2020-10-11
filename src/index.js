const dotenv = require("dotenv");
const fs = require("fs");
const p = require("path");

global.parsenv = { setting: {}, env: {} };

// load env file from .env
const config = (cfg) => {
    setting = cfg;
    let { parsed, error } = dotenv.config(cfg);
    if (error) throw error;
    global.parsenv.env = parsed;
};

// accept and edit object
const edit = (obj) => {
    let parsed = global.parsenv.env;
    Object.keys(obj).map((k) => {
        parsed[k] = obj[k];
        process.env[k] = obj[k];
    });
    global.parsenv.env = parsed;
};

// // parse value from string
// const getStringFromValue = (v) => {
//     if (v.indexOf(" ") >= 0) return `"${v}"`;
//     if (v.indexOf("@") >= 0) return `"${v}"`;
//     if (v.indexOf(".") >= 0) return `"${v}"`;
//     if (v.indexOf("#") >= 0) return `"${v}"`;
//     return v;
// };

// // write variables to .env
// const write = (cfg = {}) => {
//     let { path, encoding } = cfg;
//     if (!path)
//         path = global.parsenv.setting.path || p.resolve(process.cwd(), ".env");
//     if (!encoding) encoding = global.parsenv.setting.encoding || "utf8";

//     let content = fs.readFileSync(path, encoding);
//     let lines = content.split("\n");
//     let newLines = [];

//     lines.map((line) => {
//         let OrigEnv = dotenv.parse(Buffer.from(line));
//         let k = Object.keys(OrigEnv)[0];
//         let NewEnv = global.parsenv.env[k] || null;

//         //console.log(`${NewEnv} && ${OrigEnv[k]} !== ${NewEnv}`)

//         if (NewEnv && OrigEnv[k] !== NewEnv) {
//             //console.log(`Changed ${OrigEnv[k]} to ${NewEnv}`)
//             line = line.replace(`${k}=${OrigEnv[k]}`, `${k}=${NewEnv}`);
//         }

//         newLines.push(line);
//     });

//     console.log(newLines);
//     fs.writeFileSync(path, newLines.join("\n"));
// };

// new version of write, but comment and other spaces will be removed
const write = (cfg = {}) => {
    let { path, encoding } = cfg;
    if (!path)
        path = global.parsenv.setting.path || p.resolve(process.cwd(), ".env");
    if (!encoding) encoding = global.parsenv.setting.encoding || "utf8";
    let lines = [];

    Object.keys(global.parsenv.env).map((k) => {
        lines.push(`${k}="${String(global.parsenv.env[k])}"`);
    });

    fs.writeFileSync(path, lines.join("\n"), { encoding });
};

module.exports = { edit, config, write };
