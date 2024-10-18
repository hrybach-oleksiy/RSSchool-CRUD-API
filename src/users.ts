import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { users } from './db';
import { User } from './types/inerfaces';

// GET /api/users
export const getAllUsers = (res: ServerResponse): void => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

// GET /api/users/{userId}
export const getUserById = (res: ServerResponse, userId: string): void => {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  }
};

// POST /api/users
export const createUser = (req: IncomingMessage, res: ServerResponse): void => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);

      if (!username || !age || !Array.isArray(hobbies)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user data' }));
        return;
      }

      const newUser: User = {
        id: uuidv4(),
        username,
        age,
        hobbies,
      };

      users.push(newUser);
      console.log(users);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
  });
};

// PUT /api/users/{userId}
export const updateUser = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
): void => {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);

      if (!username || !age || !Array.isArray(hobbies)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user data' }));
        return;
      }

      user.username = username;
      user.age = age;
      user.hobbies = hobbies;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
  });
};

// DELETE /api/users/{userId}
export const deleteUser = (res: ServerResponse, userId: string): void => {
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  } else {
    users.splice(index, 1);
    res.writeHead(204);
    res.end();
  }
};
