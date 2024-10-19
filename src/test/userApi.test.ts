import request from 'supertest';
import { createServer } from '../server';
import { User } from '../types/inerfaces';

describe('User API', () => {
  let server: any;
  let userId: string;

  beforeAll(async () => {
    server = await createServer();
  });

  it('should get all users (expecting empty array)', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new user', async () => {
    const newUser: Partial<User> = {
      username: 'John Doe',
      age: 30,
      hobbies: ['reading'],
    };

    const res = await request(server).post('/api/users').send(newUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toBe('John Doe');
    userId = res.body.id;
  });

  it('should get the created user by ID', async () => {
    const res = await request(server).get(`/api/users/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.username).toBe('John Doe');
  });

  it('should update the created user', async () => {
    const updatedUser: Partial<User> = {
      username: 'Jane Doe',
      age: 25,
      hobbies: ['gaming'],
    };

    const res = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toBe('Jane Doe');
    expect(res.body.age).toBe(25);
  });

  it('should delete the created user by ID', async () => {
    const res = await request(server).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should return 404 for deleted user', async () => {
    const res = await request(server).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('User not found');
  });
});
