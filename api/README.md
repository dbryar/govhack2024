# TINA API

This is the API for the TINA project. It handles incoming requests for all client calls, maintaining the state for the session by use of context building with DynamoDB storage.

## Architecture

The main components of the TINA API are:

- **Hono**: Hono is used to handle HTTP requests and responses, and is deployed as a single Lambda function as there is minimal routing and all routes require the full backend functionality. It handles incoming requests, processes them, and streams responses. It uses the AWS SDK to interact with DynamoDB to maintain context.
- **DynamoDB**: DynamoDB is used to store session data. The Lambda function uses the AWS SDK to interact with DynamoDB for context retrieval and storage.
- **LangChain**: LangChain is used to generate responses to user queries and act as the agent for the end user. It uses the OpenAI API to generate responses and maintains a conversation history relevant to the current session.
- **OpenRouter.ai**: OpenRouter.ai is a backend LLM API server that provides access to multiple LLMs. Each LLM is accessed via a single API key with an identical model, simplifying the development process and allowing for easy switching between models.

## Installation

To install dependencies:

```bash
bun install
```

## Local Usage

Local deployment uses the **localstack** package to simulate the AWS environment with S3 storage and DynamoDB support. Localstack runs in a Docker container and can be started with the following command:

```bash
bun run localstack
```

To then run the API locally:

```bash
bun run serve
```

### Stopping the service

Use `Ctrl` + `C` to stop the service.

To destroy the localstack container:

```bash
bun run localstack:stop
```

## Deployment

Due to time and financial constraints the API is not currently deployed on the public internet. LLM usage requires tokens which are not currently available without a subscription, and it is unwise to expose an API to the public internet without proper authentication and protection against abuse where real money is involved.
