import supertest, { SuperTest, Test } from 'supertest';
import nock from 'nock';
import dedent from 'dedent';
import { RouterPaths, DownloadMetric } from './constants';
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

describe('app download metrics', () => {
    const routerMock = nock(`http://${process.env.ROUTER_HOST}:${process.env.ROUTER_PORT}`);

    test('should return no metrics when the router returns empty online devices list', async () => {
        routerMock.get(RouterPaths.OnlineList)
            .reply(200, '{"onlineList": []}', { 'content-type': 'text/plain' });
        const expectedResponse = dedent`
            # HELP ${DownloadMetric.name} ${DownloadMetric.help}
            # TYPE ${DownloadMetric.name} gauge
        `;

        const response = await request.get('/metrics').expect(200);

        expect(response.text).toEqual(expectedResponse);
    });
});
