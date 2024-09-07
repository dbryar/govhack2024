export const containerKeys = {
  // Global
  Logger: Symbol.for("Logger"),
  Axios: Symbol.for("Axios"),

  // Controllers
  FlowController: Symbol.for("FlowController"),

  // Services
  S3: Symbol.for("S3"),
  Dynamo: Symbol.for("Dynamo"),
  Session: Symbol.for("Session"),
};
