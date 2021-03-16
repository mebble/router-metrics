import { MetricInfo } from './types';

export enum RouterPaths {
    OnlineList = '/goform/getQos?modules=onlineList'
}

export const DownloadMetric: MetricInfo = {
    name: `${process.env.APP_NAME}_device_download_speed_bytes_per_second`,
    help: 'The current download speed of a device connected to the router in bytes per second',
};

export const UploadMetric: MetricInfo = {
    name: `${process.env.APP_NAME}_device_upload_speed_bytes_per_second`,
    help: 'The current upload speed of a device connected to the router in bytes per second',
};

export const RouterUpMetric: MetricInfo = {
    name: `${process.env.APP_NAME}_up`,
    help: `Indicates whether the ${process.env.APP_NAME} is up. 0 means it is not up, and 1 means it is up`,
};
