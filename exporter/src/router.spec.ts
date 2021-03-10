import sinon from 'sinon';
import { Response } from 'node-fetch';
import { DeviceOnline } from './types';
import { RouterPaths } from './constants';
import { router } from './router';

const stubFetcher = (devices: DeviceOnline[]): sinon.SinonStub => {
    const upstreamBody = JSON.stringify({ onlineList: devices });
    const response = new Response();
    sinon.stub(response, "text").returns(Promise.resolve(upstreamBody));
    const fetch = sinon.stub().returns(Promise.resolve(response));

    return fetch;
};

afterEach(() => {
    sinon.restore();
});

describe('getDevices', () => {
    test('should return empty array when upstream response returns empty onlineList', async () => {
        const fetch = stubFetcher([]);
        const getDevices = router(fetch);

        const res = await getDevices();

        expect(res).toEqual([]);
    });

    test('should return parsed array when upstream response returns non-empty onlineList', async () => {
        const expected: DeviceOnline[] = [
            {
                qosListHostname: "host1",
                qosListRemark: "remark1",
                qosListIP: "ip1",
                qosListConnectType: "conn1",
                qosListMac: "mac1",
                qosListDownSpeed: "downSpeed1",
                qosListUpSpeed: "upSpeed1",
                qosListDownLimit: "downLimit1",
                qosListUpLimit: "upLimit1",
                qosListAccess: "listAccess1",
            },
            {
                qosListHostname: "host2",
                qosListRemark: "remark2",
                qosListIP: "ip2",
                qosListConnectType: "conn2",
                qosListMac: "mac2",
                qosListDownSpeed: "downSpeed2",
                qosListUpSpeed: "upSpeed2",
                qosListDownLimit: "downLimit2",
                qosListUpLimit: "upLimit2",
                qosListAccess: "listAccess2",
            },
        ];
        const fetch = stubFetcher(expected);
        const getDevices = router(fetch);

        const res = await getDevices();

        expect(res).toEqual(expected);
    });

    test('should call the fetcher with the expected url', async () => {
        const fetch = stubFetcher([]);
        const expectedUrl = `http://${process.env.ROUTER_HOST}:${process.env.ROUTER_PORT}${RouterPaths.OnlineList}`;
        const getDevices = router(fetch);

        await getDevices();

        expect(fetch.calledOnceWith(expectedUrl)).toBe(true);
    });
});
