import { Fetcher, DeviceOnline } from './types';

export const router = (fetch: Fetcher, url: string) => async (): Promise<DeviceOnline[]> => {
    const res = await fetch(url);
    const body = await res.text();
    const devices: DeviceOnline[] = JSON.parse(body).onlineList;
    return devices;
};
