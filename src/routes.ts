import { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import { User } from './types/inerfaces';
import { HTTPMethod } from './types/enums';
import { getAllUsers } from './users';

export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = url.parse(req.url as string, true);
  const { pathname } = parsedUrl;
  const method = req.method as string;

  if (pathname === '/api/users' && method === HTTPMethod.GET) {
    getAllUsers(res);
  }
};
