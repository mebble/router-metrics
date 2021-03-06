import supertest, { SuperTest, Test } from 'supertest';
import nock from 'nock';
import dedent from 'dedent';
import { RouterPaths, DownloadMetric, UploadMetric, RouterUpMetric } from './constants';
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

describe('app upload/download metrics', () => {
    const routerMock = nock(`http://${process.env.ROUTER_HOST}:${process.env.ROUTER_PORT}`);

    test('should return no upload/download metrics and zero router_up metric when the router returns non-2xx response', async () => {
        routerMock.get(RouterPaths.OnlineList)
            .reply(503);
        const expectedResponse = dedent`
            # HELP ${RouterUpMetric.name} ${RouterUpMetric.help}
            # TYPE ${RouterUpMetric.name} gauge
            ${RouterUpMetric.name} 0

            # HELP ${UploadMetric.name} ${UploadMetric.help}
            # TYPE ${UploadMetric.name} gauge

            # HELP ${DownloadMetric.name} ${DownloadMetric.help}
            # TYPE ${DownloadMetric.name} gauge
        ` + '\n';

        const response = await request.get('/metrics').expect(200);

        expect(response.text).toEqual(expectedResponse);
    });

    test('should return no upload/download metrics and one router_up metric when the router returns empty online devices list', async () => {
        routerMock.get(RouterPaths.OnlineList)
            .reply(200, '{"onlineList": []}', { 'content-type': 'text/plain' });
        const expectedResponse = dedent`
            # HELP ${RouterUpMetric.name} ${RouterUpMetric.help}
            # TYPE ${RouterUpMetric.name} gauge
            ${RouterUpMetric.name} 1

            # HELP ${UploadMetric.name} ${UploadMetric.help}
            # TYPE ${UploadMetric.name} gauge

            # HELP ${DownloadMetric.name} ${DownloadMetric.help}
            # TYPE ${DownloadMetric.name} gauge
        ` + '\n';

        const response = await request.get('/metrics').expect(200);

        expect(response.text).toEqual(expectedResponse);
    });

    test('should return upload/download metrics and one router_up metric when the router returns online devices', async () => {
        routerMock.get(RouterPaths.OnlineList)
            .reply(200, dedent`
                {
                    "onlineList": [{
                        "qosListHostname": "OnePlus3T",
                        "qosListRemark": "",
                        "qosListIP": "",
                        "qosListConnectType": "wifi",
                        "qosListMac": "mac",
                        "qosListDownSpeed": "6.23",
                        "qosListUpSpeed": "1.97",
                        "qosListDownLimit": "",
                        "qosListUpLimit": "",
                        "qosListAccess": ""
                    }, {
                        "qosListHostname": "iPhone",
                        "qosListRemark": "",
                        "qosListIP": "",
                        "qosListConnectType": "wifi",
                        "qosListMac": "iPhoneMac",
                        "qosListDownSpeed": "23.01",
                        "qosListUpSpeed": "9.0",
                        "qosListDownLimit": "",
                        "qosListUpLimit": "",
                        "qosListAccess": ""
                    }]
                }`, { 'content-type': 'text/plain' });
        const expectedResponse = dedent`
            # HELP ${RouterUpMetric.name} ${RouterUpMetric.help}
            # TYPE ${RouterUpMetric.name} gauge
            ${RouterUpMetric.name} 1

            # HELP ${UploadMetric.name} ${UploadMetric.help}
            # TYPE ${UploadMetric.name} gauge
            ${UploadMetric.name}{device_name="OnePlus3T",device_mac="mac",connection_type="wifi"} 1970
            ${UploadMetric.name}{device_name="iPhone",device_mac="iPhoneMac",connection_type="wifi"} 9000

            # HELP ${DownloadMetric.name} ${DownloadMetric.help}
            # TYPE ${DownloadMetric.name} gauge
            ${DownloadMetric.name}{device_name="OnePlus3T",device_mac="mac",connection_type="wifi"} 6230
            ${DownloadMetric.name}{device_name="iPhone",device_mac="iPhoneMac",connection_type="wifi"} 23010
        ` + '\n';

        const response = await request.get('/metrics').expect(200);

        expect(response.text).toEqual(expectedResponse);
    });
});
