# ardis.lu
[![Maintainability](https://api.codeclimate.com/v1/badges/e036880db60c5df107c7/maintainability)](https://codeclimate.com/github/ardislu/ardislu.github.io/maintainability)

This project contains the Angular codebase for my personal website [ardis.lu](https://ardis.lu).

# Quickstart

## Requirements

- (Optional) [Chocolatey](https://chocolatey.org/)
- [Node.js](https://nodejs.org/)
- [git](https://gitforwindows.org/)

You can install Node.js and git from their respective websites, or use Chocolatey to install them from Powershell:
```
choco install nodejs
choco install git
```

## Setup

1. Install Angular CLI globally (not actually required but a good idea for future Angular projects)
```
npm install -g @angular/cli
```

2. Clone the repository
```
git clone https://github.com/ardislu/ardislu.github.io.git
```

3. Install project dependencies
```
npm i
```

4. Initiate a development server
```
ng serve
```

5. Go to the [development server](http://localhost:4200/) in your browser

# Testing on Other Devices
To connect to the development server from other devices, initiate the development server on all IP addresses on the local machine:
```
ng serve --host 0.0.0.0
```

Then get your local IP address from Powershell:
```
ipconfig
```

Now you can connect to the development server from any device on the local network (e.g. your phone or tablet). For example, if my local IP address is `192.168.1.21`, go to this address from the phone or tablet's internet browser:
```
192.168.1.21:4200
```

# Note on Web Server Configuration
For Angular apps using HTML5 URLs (i.e. URLs that look like separate pages but are actually not), we need to [configure the web server to fallback to index.html](https://angular.io/guide/deployment#server-configuration). 

If you use `npm start` or `npm run stage` to host a development web server, the development web server is already configured to redirect as required. 

# Pre-commit hook
The npm postinstall script configures git locally to run a custom pre-commit hook, located at `.git-hooks/pre-commit`.

The `pre-commit` file is a bash script that pipes any staged .js or .ts files to `eslint`, and any staged .css or .scss files to `stylelint`.

# Testing
This project uses [Jest](https://www.npmjs.com/package/jest) for unit testing (instead of Jasmine + Karma), and [Playwright](https://www.npmjs.com/package/playwright) for e2e testing (instead of Protractor). The Angular architects have been adapted for these frameworks so tests are still run with the usual `npm run test` and `npm run e2e`.

# Cloudflare Tunnel
I use `cloudflared` in the `start:tunnel` and `stage:tunnel` npm scripts. This command exposes `localhost` to the internet for rapid prototyping with external parties. To use these commands, you must have a Cloudflare account (free), download the `cloudflared` executable, put it on your `PATH`, and run `cloudflared tunnel login` once (full instructions [here](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation)). There is no npm package for `cloudflared` (yet), so this installation must be completed manually.

**WARNING:** Cloudflare Tunnel may cache your website even after you've closed the local server. So don't use this command if there's any sensitive content.

# Developer Reference

## Helpful Global Packages
These packages might be useful to have outside the local context (see below for usage):
```
npm install -g depcheck
npm install -g npm-check-updates
npm install -g local-web-server
npm install -g lighthouse
npm install -g svgo
```

## Helpful Development Packages
In addition to the default packages included by Angular CLI, I've added the following packages as developer dependencies in package.json:
```
local-web-server
source-map-explorer
```

## Helpful npm Scripts
Modified `npm start` runs `ng serve --hmr --host 0.0.0.0` instead of the default `ng serve`.
```
npm start
```

Run `npm start` and also `cloudflared tunnel` to expose `localhost:4200` to a public URL.
```
npm run start:tunnel
```

Build the web app then host it locally using local-web-server. Use to simulate production for e2e testing. 
```
npm run stage
```

Run `npm run stage` and also `cloudflared tunnel` to expose `localhost:8000` to a public URL.
```
npm run stage:tunnel
```

Build the web app then use source-map-explorer to analyze main.js. Use to identify and reduce bloat.
```
npm run analyze
```

Lint the entire project with `ng lint` (for Typescript and HTML) and `stylelint` (for SCSS).
```
npm run lint
```

## Helpful Assorted Commands
Generate a new module "XXX" and add a "YYY" component as the route inside app.module. Use this set up a Single Component Angular Module (SCAM) to enable lazy-loading for a new project/card.
```
ng g module XXX --route YYY --module app.module
```

Example: add the colab-hosting page. 
```
ng g module pages/colab-hosting --route colab-hosting --module app.module
```

List all global packages
```
npm list -g --depth 0
```

Check that all global packages are at their latest version
```
ncu -g
```

Check all local packages are at their latest MINOR version (within the same major version)
```
npm outdated
```

Check all local packages are at their latest version (includes major versions)
```
ncu
```

Check package.json for unused dependencies
```
depcheck
```

Remove packages from node_modules that are not listed in package.json
```
npm prune
```

Install all dependencies per package.json and update package-lock.json accordingly
```
npm install
```

Delete node_modules and install all dependencies per package-lock.json, throw an error if package.json is inconsistent with package-lock.json
```
npm ci
```

Run simple web server configured for SPAs (redirects all URLs to index.html) and output dynamic access stats to console
```
ws --spa index.html --log.format stats
```

Run a [Lighthouse](https://developers.google.com/web/tools/lighthouse) audit on the development server (assuming hosted with the `ws` command above)
```
lighthouse http://127.0.0.1:8000/ --view
```

Minify a .svg file
```
svgo example.svg
```
