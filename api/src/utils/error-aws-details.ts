export const generateAwsErrorDetails = (error: unknown): Record<string, unknown> | undefined => {
  if (error instanceof Error) {
    const { name, message } = error;
    return { name, message };
  }
  return;
};
