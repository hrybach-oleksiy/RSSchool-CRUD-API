import { ServerResponse } from 'http';

export const handleError = (res: ServerResponse, error: unknown) => {
  console.error(error);
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      status: 'error',
      message: 'Something went wrong on the server. Please try again later.',
    }),
  );
};
