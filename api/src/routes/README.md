# Routes

The routes define all the endpoints that can be accessed by the clients.

The API is versioned using the standard `v1` suffix on the path, with all current routes thus being prefixed with `/api/v1`. This allows for future API versions to be added without breaking existing clients.

## User

The user route has the following endpoints:

- `POST /users/` - Creates a new user session. Returns a session ID that is also stored as a cookie. The cookie must be sent with all subsequent requests to the API.
- `GET /users/:session` - Gets the current conversation, including all history.
- `POST /users/:session` - Sends the next user response to the LLM agent for the current conversation. Streams a response to the client.
- `DELETE /users/:session` - Deletes the current user session.

### Lookups

- `GET /users/:session/lookup/legal` - Attempt to locate any applicable legislation that may be relevant to the current conversation.
- `GET /users/:session/lookup/party` - Attempt to locate the responsible party and the appropriate level of government with respect to the current conversation,
- `GET /users/:session/lookup/contact` - Attempt to locate contact information for the identified responsible party.

### Enquiries

- `POST /users/:session/enquiries` - Creates a new enquiry from the current conversation using the current legal framework (if any), the identified responsible party, and the identified contact information.
- `GET /users/:session/enquiries/:enquiry` - Gets the current model response that will form the basis of the user enquiry to the government service.
- `PUT /users/:session/enquiries/:enquiry` - Updates the current model response with user edits.

## Agent

The agent route has the following endpoints:

- `POST /agents` - Creates a new agent session. Returns a session ID that is also stored as a cookie. The cookie must be sent with all subsequent requests to the API.
- `GET /agents/:session` - Gets the current agent profile
- `PUT /agents/:session` - Updates the current agent profile
- `DELETE /agents/:session` - Deletes the current agent session.

### Analytics

- `POST /agents/:session/analytics` - Create a new analytics submission from a document or content page to be published (by the government service), and return the ID.
- `GET /agents/:session/analytics/:submission` - Get the state of the analytics submission.
- `POST /agents/:session/analytics/:submission` - Elicit feedback from the model on the adherence to the Style Guide.

### Enquiry Responses

- `POST /agents/:session/enquiries` - Create a new enquiry submission from the document received (by the government service)
- `GET /agents/:session/enquiries/:enquiry` - Get the state of the enquiry
- `GET /agents/:session/enquiries/:enquiry/responses` - Generate a new response to the enquiry, and return the ID
- `GET /agents/:session/enquiries/:enquiry/responses/:response` - Get the current model response that will be sent to the user.
- `PUT /agents/:session/enquiries/:enquiry/responses/:response` - Updates the current model response with agent edits. Feedback is received based on the response adherence to the Style Guide.
- `POST /agents/:session/enquiries/:enquiry/responses/:response` - Finalises the response and marks the response as complete.
