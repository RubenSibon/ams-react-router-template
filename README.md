# React Router template for the City of Amsterdam

## Features

- [React Router (framework)](https://reactrouter.com/) with [Vite](https://vite.dev/) builder - React framework and build tool
- [TypeScript](https://www.typescriptlang.org/) - strongly typed programming language built on JavaScript
- [Testing Library](https://testing-library.com/) and [Vitest](https://vitest.dev/) - testing utilities and framework
- [ESLint](https://eslint.org/) - TypeScript, JavaScript, TSX, JSON and Markdown linter
- [ESLint Stylistic](https://eslint.style/) and [Perfectionist](https://perfectionist.dev/) - ESLint plugins for code style and formatting
- [Stylelint](https://stylelint.io/) - CSS style linter
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://www.npmjs.com/package/lint-staged) - git hooks to ensure code quality and standards

### Development standards

This project is part of the City of Amsterdam and aims to comply with the [Development Standards](https://developers.amsterdam/).

The user interface is build with the [Amsterdam Design System](https://designsystem.amsterdam/).

Git commits should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## Requisites

- [Node.js](https://nodejs.org/) - the latest long-term support (LTS) version (see `engines` in `package.json` for current version)
- [PNPM](https://pnpm.io/) - performant Node.js package manager (see `engines` and `packageManager` in `package.json` for current version)
- [Corepack](https://www.npmjs.com/package/corepack) - manage bridge between Node.js and PNPM
- [Make](https://www.gnu.org/software/make/) - build automation tool
- [Docker](https://www.docker.com/) - container platform for development and deployment (optional for development)

> Tip: PNPM can be used as Node.js version manager with `pnpm env`. See [PNPM Node.js version management](https://pnpm.io/cli/env).
> We recommend to remove any Node.js installations on your system and then [install PNPM with a standalone script](https://pnpm.io/installation#using-a-standalone-script).
> Then install the current Node.js LTS version and Corepack with `pnpm env use -g lts && pnpm add -g corepack`.
> Use Corepack to keep PNPM up-to-date in the project: `corepack use pnpm@latest`.

### About development and build tooling

Many instructions in this README use [Make](https://www.gnu.org/software/make/) to simplify commands. Check the [Makefile](Makefile) for the actual commands.

This app can be developed, build and run for production locally or in Docker containers. Check the [Makefile](Makefile), the [Dockerfile](Dockerfile) and the [docker-compose.yaml](docker-compose.yaml) to learn more.

## Development

### Local development environment

You can develop locally (A) or in a Docker container (B).

#### A) Local development

Install the dependencies and run the app in a dev server with live reloading:

```sh
make dev-local
```

Your application will be available at `http://localhost:5173`.

#### B) Develop with Docker

Start the development server with live reloading in a Docker container:

```sh
make dev
```

The application will be available at `http://localhost:5173`.

### Testing

The project uses [Testing Library](https://testing-library.com/) and [Vitest](https://vitest.dev/) for unit, integration and snapshot testing.

> To do: add test plan.

Run all tests once:

```sh
make test
```

Continuously run the test suite and watch for file changes:

```sh
make test-watch
```

Check test coverage:

```sh
make test-coverage
```

Then open [test/coverage/index.html](test/coverage/index.html) to view the coverage report in a browser.

### Linting and formatting

This project uses [ESLint](https://eslint.org/) to lint and type-check code with the [TypeScript ESLint](https://typescript-eslint.io/), [React](https://www.npmjs.com/package/eslint-plugin-react), [JSON](https://www.npmjs.com/package/@eslint/json) and [Markdown](https://www.npmjs.com/package/@eslint/markdown) plugins. For code style and formatting the [Stylistic](https://eslint.style/) and [Perfectionist](https://perfectionist.dev/) plugins are used.

For CSS linting we use [Stylelint](https://stylelint.io/).

Run the linters and formatters once:

```sh
make lint
```

Fix all auto-fixable issues:

```sh
make lint-fix
```

### Building for production

Locally install the dependencies and build for production:

```sh
make build-local
```

## Deployment

You can deploy yourself (A) or push a Docker container (B).

### A) DIY deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `make build-local`

```txt
├── package.json
├── pnpm-lock.yaml
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

To locally start the production server:

```sh
make app-local # This also builds the application.
```

### B) Docker deployment

Build and start the production server in a Docker container:

```sh
make app
```

The application will be available at `http://localhost:3000`.

## Cleanup

To clean everything up run:

```sh
make clean
# or to only bring down Docker containers do:
make clean-docker
# or to only clean local files do:
make clean-local
```

> Note: `node_modules` and `.react-router` may have been created due to volume mapping with a Docker container. It might not be possible
> to remove them without root privileges. If this happens do `sudo rm -Rf .react-router node_modules` manually.

---

Built with ❤️ by developers of the City of Amsterdam using React Router.
