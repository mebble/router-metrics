import sinon from 'sinon';
import { Response } from 'node-fetch';
import { Fetcher, DeviceOnline } from './types';
import { router } from './router';

const stubFetcher = (devices: DeviceOnline[]): Fetcher => {
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
});
