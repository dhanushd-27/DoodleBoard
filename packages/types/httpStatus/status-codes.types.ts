export const Status = {
  Success: 200,
  Failed: 400,
  Unauthorized: 401,
  ServerFailed: 500,
  InvalidData: 422,
  NotFound: 404,
  Conflict: 409
} as const;

type Status = typeof Status[keyof typeof Status];