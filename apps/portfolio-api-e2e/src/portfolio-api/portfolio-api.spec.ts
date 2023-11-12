import axios from 'axios';

describe('GET /', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});

describe('POST /auth', () => {
  it('should return a status and a name', async () => {
    const res = await axios.post(`/auth`, {});

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ success: true, name: 'Cheddar' });
  });
});
