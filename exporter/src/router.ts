import { Fetcher, DeviceOnline } from './types';

export const router = (_fetch: Fetcher) => async (): Promise<DeviceOnline[]> => {
    return [];
};
