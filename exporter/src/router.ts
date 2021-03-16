import { Fetcher, DeviceOnline } from './types';
import { RouterPaths } from './constants';

export const router = (fetch: Fetcher) => async (): Promise<DeviceOnline[]> => {
    const url = `http://${process.env.ROUTER_HOST}:${process.env.ROUTER_PORT}${RouterPaths.OnlineList}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Router returned HTTP status code ${res.status}`);
    }

    const body = await res.text();
    const devices: DeviceOnline[] = JSON.parse(body).onlineList;
    return devices;
};
