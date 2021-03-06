export type DeviceOnline = {
    qosListHostname: string;
    qosListRemark: string;
    qosListIP: string;
    qosListConnectType: string;
    qosListMac: string;
    qosListDownSpeed: string;
    qosListUpSpeed: string;
    qosListDownLimit: string;
    qosListUpLimit: string;
    qosListAccess: string;
};

export type DeviceMetricLabels = {
    deviceName: string;
    deviceMac: string;
    connectionType: string;
};

export type DeviceMetric = {
    value: number;
    labels: DeviceMetricLabels;
}
