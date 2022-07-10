# ardis.lu

[![Maintainability](https://api.codeclimate.com/v1/badges/e036880db60c5df107c7/maintainability)](https://codeclimate.com/github/ardislu/ardislu.github.io/maintainability)

This project contains the Angular codebase for my personal website
[ardis.lu](https://ardis.lu).

# Requirements

- [Node.js](https://nodejs.org/)
- [git](https://gitforwindows.org/)

# Setup

1. Install the Angular CLI globally

```
npm install -g @angular/cli
```

2. Clone the repository

```
git clone https://github.com/ardislu/ardis.lu.git
```

3. Install project dependencies

```
npm i
```

4. Build the project and start a development web server

```
npm run start
```

5. Go to the [development server](http://localhost:4200/) in a web browser

# Pre-commit hook

The npm postinstall script configures git locally to run a custom pre-commit
hook, located at `.git-hooks/pre-commit`.

The `pre-commit` file is a bash script that pipes any staged .js or .ts files to
`eslint`, and any staged .css or .scss files to `stylelint`.

# Unit and e2e testing

This project uses [Jest](https://www.npmjs.com/package/jest) for unit testing
(instead of Jasmine + Karma), and
[Playwright](https://www.npmjs.com/package/playwright) for e2e testing (instead
of Protractor). The Angular architects have been adapted for these frameworks so
tests are still run with the usual `npm run test` and `npm run e2e`.

# Cloudflare Tunnel

I use `cloudflared` in the `start:tunnel` and `stage:tunnel` npm scripts. This
command exposes `localhost` to the internet for rapid prototyping with external
parties. To use these commands, you must have a Cloudflare account (free),
download the `cloudflared` executable, put it on your `PATH`, and run
`cloudflared tunnel login` once (full instructions
[here](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation)).
There is no npm package for `cloudflared` (yet), so this installation must be
completed manually.

**WARNING:** Cloudflare Tunnel may cache your website even after you've closed
the local server. So don't use this command if there's any sensitive content.

# npm scripts

Modified `npm start` runs `ng serve --hmr --host 0.0.0.0` instead of the default
`ng serve`.

```
npm start
```

Run `npm start` and also `cloudflared tunnel` to expose `localhost:4200` to a
public URL.

```
npm run start:tunnel
```

Build the web app then host it locally using local-web-server. Use to simulate
production for e2e testing.

```
npm run stage
```

Run `npm run stage` and also `cloudflared tunnel` to expose `localhost:8000` to
a public URL.

```
npm run stage:tunnel
```

Build the web app then use source-map-explorer to analyze main.js. Use to
identify and reduce bloat.

```
npm run analyze
```

Lint the entire project with `ng lint` (for Typescript and HTML) and `stylelint`
(for SCSS).

```
npm run lint
```
