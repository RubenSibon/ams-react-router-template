.PHONY: all app build build-local app-local install upgrade dev dev-local test test-watch test-coverage test-update-snapshots test-dangerously-clean-snapshots clean-docker clean-local clean refresh

dc = docker compose

all: app

# Start the Docker container for production use.
app:
	${dc} --profile prod up --remove-orphans

# Build the Docker image for production use.
build:
	${dc} --profile build up --remove-orphans

# Build the app locally for production use.
# Note: `pnpm install --ignore-scripts` makes sure that the `prepare` script does not run as it is not required for building the app.
# Note `pnpm audit` with `-P` flag makes sure that the audit fix is applied to the production dependencies only.
build-local:
	pnpm install --ignore-scripts
	pnpm audit -P fix
	pnpm build

# Start the app locally for production use.
app-local: build-local
	pnpm start

# Install dependencies and generate types.
install:
	pnpm install
	pnpm audit fix
	pnpm typegen

# Upgrade dependencies and generate types.
upgrade:
	pnpm upgrade
	pnpm audit fix
	pnpm typegen

# Start the Docker container for development use.
# Note: install dependencies locally and generate types first so that you have type checking and intellisense available in the IDE.
dev: install
	${dc} --profile dev up --remove-orphans

# Start the app locally for development use.
dev-local: install
	pnpm dev

test: install
	pnpm test

test-watch: install
	pnpm test:watch

test-coverage: install
	pnpm test:coverage

test-update-snapshots: test $(-u)

test-dangerously-clean-snapshots:
	find . -name "__snapshots__" -type d -exec rm -rf {} +

lint: install
	pnpm lint

lint-fix: install
	pnpm lint-fix

lint-staged:
	pnpm lint-staged

clean-docker:
	docker image rm schulddossier-frontend -f
	${dc} down --rmi all --remove-orphans

clean-local:
	pnpm clean

clean: clean-docker clean-local

refresh: clean all
