# TINA (tina-client)

This is a basic, no frills Client to access the TINA API. It has been developed with speed and simplicity in mind, and is not intended for production use.

## Installation

```bash
bun install
```

## Local Usage

The client can be set up in local development mode for working with non-APi elements such as design and content, however to interact with the API it requires a LocalStack server to be running.

### Start the app in local development mode (hot-code reloading, error reporting, etc.)

```bash
bun run dev
```

### Check for formatting errors

```bash
bun run lint
```

### Auto-format project files

```bash
bun run lint:fix
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## LocalStack

Local deployment uses the **localstack** package to simulate the AWS environment with S3 storage and DynamoDB support. Localstack runs in a Docker container and can be started with the following command:

```bash
bun run localstack
```

The `localstack` folder may need to be created manually in the project root, with open permissions, depending on your system settings.

From this folder (`./client`) run the following commands:

```bash
mkdir ../localstack
chmod 777 ../localstack
```

### Build the app for deployment

```bash
bun run build
```

### Deploy to S3

```bash
bun run deploy
```

Once the deployment is complete, the app can be accessed at the root of the localstack server. This will load the deployed version of the app and connect to the API.
