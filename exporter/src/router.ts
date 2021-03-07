import { Fetcher, DeviceOnline } from './types';

export const router = (fetch: Fetcher) => async (): Promise<DeviceOnline[]> => {
    const res = await fetch('some-url');
    const body = await res.text();
    const devices: DeviceOnline[] = JSON.parse(body).onlineList;
    return devices;
};
