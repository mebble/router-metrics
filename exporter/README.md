# Router Metrics Exporter

Exports Prometheus metrics from the router

## Requirements

- [Typescript](https://www.npmjs.com/package/typescript) installed globally
- [Node.js and npm](https://nodejs.org/en/download/)

## Setup

Go to this project's root directory and install dependencies:

```bash
cd exporter
npm install
```

Create a `.env` file by copying the `.env.sample` and giving the variables your desired values:

```bash
cp .env.sample .env
```

## Development

Test the server:

```bash
npm test
```

Run the server in development mode:

```bash
npm run dev
```

## Run

Compile the server and run it:

```bash
npm run build
npm start
```

## TODOs

- Ensure node version match on @types/node, CI, box.
- Decide how to handle non-2xx response from router. How should we relay this to Prometheus? Empty response? With an error as well?

## Challenges

- Sinon stubbing overloaded methods: [issue #36436](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36436) and [PR #42042](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/42042)
