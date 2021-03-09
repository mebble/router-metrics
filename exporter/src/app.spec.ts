import supertest, { SuperTest, Test } from 'supertest';
import { createApp } from './app';

let request: SuperTest<Test>;

beforeAll(() => {
    const app = createApp();
    request = supertest(app);
});

describe('app ping', () => {
    test('should respond to a ping request', async () => {
        const response = await request.get('/ping').expect(200);
        expect(response.text).toEqual('pong!');
    });
});
