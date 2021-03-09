import { MetricInfo } from './types';

export enum RouterPaths {
    OnlineList = '/goform/getQos?modules=onlineList'
}

export const DownloadMetric: MetricInfo = {
    name: `${process.env.APP_NAME}_device_download_speed_bytes_per_second`,
    help: 'The current download speed of a device connected to the router in bytes per second',
};
