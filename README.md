# Cara Feature Automation

Cara feature automation is the end to end cross browser functional test for cara application.

This automation suites require [Cara API](https://github.com/itchef/cara-api) and [Cara App](https://github.com/itchef/cara-app)

## System Requirements
* NodeJS = **9.5.0**
* yarn = **1.3.2**
* Google Chrome Browser
* Firefox Browser

## Development server

1. Run `yarn install` to download `node_modules`.
2. Create .env file on the project root and configure

| Variable | Description |
| ------ | ------ |
| APP_URL | Cara application URL. e.g. http://localhost:4200 |
| ADMIN_USERNAME | Cara admin username |
| ADMIN_PASSWORD | Cara admin password |

3. Run `yarn test` to run the test suites.

```
You can get process of running cara app and cara api from above links
```


## License
![GNU GPL V3](https://www.gnu.org/graphics/gplv3-127x51.png)
