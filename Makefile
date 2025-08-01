.PHONY: all app build-local app-local install-local dev dev-local test test-watch test-coverage clean-docker clean-local clean refresh

dc = docker compose

all: app

app:
	${dc} --profile prod up --remove-orphans

# Note: `--ignore-scripts` makes sure that the `prepare` script does not run as it is not required for building the app.
build-local:
	pnpm install --ignore-scripts
	pnpm build

app-local: build-local
	pnpm start

install-local:
	pnpm install
	pnpm typegen

# Note: install dependencies locally and generate types first so that you have type checking and intellisense available in the IDE.
dev: install-local
	${dc} --profile dev up --remove-orphans

dev-local: install-local
	pnpm dev

test: install-local
	pnpm test

test-watch: install-local
	pnpm test:watch

test-coverage: install-local
	pnpm test:coverage

lint: install-local
	pnpm lint

lint-fix: install-local
	pnpm lint-fix

lint-staged: install-local
	pnpm lint-staged

clean-docker:
	${dc} down --rmi all --remove-orphans

clean-local:
	pnpm clean

clean: clean-docker clean-local

refresh: clean all
