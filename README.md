# ParsEnv

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Edit, Save or Load variables from .env ( For Nodejs )

## WHY I CREATE THIS

Since [motdotla/dotenv](https://github.com/motdotla/dotenv) can load variables from .env but can't save modified variables into .env, I just want to create this stuff.


## USAGE

### Load variables

```javascript
const dotenv = require("parsenv");
```

### Edit variables

```javascript
const dotenv = require("parsenv");

dotenv.edit({ VARIABLE: "value", ANOTHER: "another" });
```

### Save variables

```javascript
const dotenv = require("parsenv");

dotenv.write();
```


## EXAMPLE

```javascript
const parsenv = require("../src");
const p = require("path");

parsenv.config();

parsenv.edit({ NAME: "NAME CHANGED", ANOTHER_VARIABLE: "BAZ" });

parsenv.write({ path: p.join(__dirname, "../.env.modified") });
```


## CONFIGURATION

```javascript
const dotenv = require("parsenv");

const config = {
    path: require('path').resolve(process.cwd(), ".env") // default
    encoding: 'utf8' // default
    debug: false // default
};

// config can apply to dotenv.config function
dotenv.config(config);

// also pass it to dotenv.write function
dotenv.write(config);
```

These settings and variables can be modified through `global.parsenv.setting` and `global.parsenv.env`. But recommend `edit` method to change variable


## LICENSE

`ParsEnv` is licensed under the MIT license. See [License](LICENSE) for more information.