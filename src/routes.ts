import { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import { HTTPMethod } from './types/enums';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './users';
import { handleError } from './helpers/handleError';

export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const parsedUrl = url.parse(req.url as string, true);
    const { pathname } = parsedUrl;
    const method = req.method as string;

    if (pathname === '/api/users' && method === HTTPMethod.GET) {
      getAllUsers(res);
    } else if (
      pathname?.startsWith('/api/users/') &&
      method === HTTPMethod.GET
    ) {
      const userId = pathname.split('/').pop();
      if (userId) getUserById(res, userId);
    } else if (pathname === '/api/users' && method === HTTPMethod.POST) {
      createUser(req, res);
    } else if (
      pathname?.startsWith('/api/users/') &&
      method === HTTPMethod.PUT
    ) {
      const userId = pathname.split('/').pop();
      if (userId) updateUser(req, res, userId);
    } else if (
      pathname?.startsWith('/api/users/') &&
      method === HTTPMethod.DELETE
    ) {
      const userId = pathname.split('/').pop();
      if (userId) deleteUser(res, userId);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  } catch (error) {
    handleError(res, error);
  }
};
