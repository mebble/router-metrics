import sinon from 'sinon';
import { Response } from 'node-fetch';
import { DeviceOnline } from './types';
import { router } from './router';

afterEach(() => {
    sinon.restore();
});

describe('getDevices', () => {
    test('should return empty array when upstream response has empty onlineList', async () => {
        const upstreamResponse = JSON.stringify({
            onlineList: new Array<DeviceOnline>()
        });
        const response = new Response();
        sinon.stub(response, "text").returns(Promise.resolve(upstreamResponse));
        const fetch = sinon.stub().returns(Promise.resolve(response));
        const getDevices = router(fetch);

        const res = await getDevices();

        expect(res).toEqual([]);
    });
});
