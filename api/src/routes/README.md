# Routes

The routes define all the endpoints that can be accessed by the clients.

The API is versioned using the standard `v1` suffix on the path, with all current routes thus being prefixed with `/api/v1`. This allows for future API versions to be added without breaking existing clients.

## User

The user route has the following endpoints:

- `POST /user` - Creates a new user session. Returns a session ID that is also stored as a cookie. The cookie must be sent with all subsequent requests to the API.
- `GET /user` - Gets the current conversation, including all history.
- `PUT /user` - Sends the next user response to the LLM agent for the current conversation. Streams a response to the client.
- `DELETE /user` - Deletes the current user session.

### Lookups

- `GET /user/lookup/legal` - Attempt to locate any applicable legislation that may be relevant to the current conversation.
- `GET /user/lookup/party` - Attempt to locate the responsible party and the appropriate level of government with respect to the current conversation,
- `GET /user/lookup/contact` - Attempt to locate contact information for the identified responsible party.

### Enquiries

- `POST /user/enquiries` - Creates a new enquiry from the current conversation using the current legal framework (if any), the identified responsible party, and the identified contact information.
- `GET /user/enquiries/:enquiry` - Gets the current model response that will form the basis of the user enquiry to the government service.
- `PUT /user/enquiries/:enquiry` - Updates the current model response with user edits.

## Agent

The agent route has the following endpoints:

- `POST /agent` - Creates a new agent session. Returns a session ID that is also stored as a cookie. The cookie must be sent with all subsequent requests to the API.
- `GET /agent` - Gets the current agent profile
- `PUT /agent` - Updates the current agent profile
- `DELETE /agent` - Deletes the current agent session.

### Analytics

- `POST /agent/analytics` - Create a new analytics submission from a document or content page to be published (by the government service), and return the ID.
- `GET /agent/analytics/:submission` - Get the state of the analytics submission.
- `POST /agent/analytics/:submission` - Elicit feedback from the model on the adherence to the Style Guide.

### Enquiry Responses

- `POST /agent/enquiries` - Create a new enquiry submission from the document received (by the government service)
- `GET /agent/enquiries/:enquiry` - Get the state of the enquiry
- `GET /agent/enquiries/:enquiry/responses` - Generate a new response to the enquiry, and return the ID
- `GET /agent/enquiries/:enquiry/responses/:response` - Get the current model response that will be sent to the user.
- `PUT /agent/enquiries/:enquiry/responses/:response` - Updates the current model response with agent edits. Feedback is received based on the response adherence to the Style Guide.
- `POST /agent/enquiries/:enquiry/responses/:response` - Finalises the response and marks the response as complete.
