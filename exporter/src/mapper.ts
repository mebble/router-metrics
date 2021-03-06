import { DeviceOnline, DeviceMetric } from './types';

export const downSpeedMetric = (device: DeviceOnline): DeviceMetric => {
    return {
        value: parseFloat(device.qosListDownSpeed),
        labels: {
            deviceName: device.qosListHostname,
            deviceMac: device.qosListMac,
            connectionType: device.qosListConnectType,
        }
    };
};

export const upSpeedMetric = (device: DeviceOnline): DeviceMetric => {
    return {
        value: parseFloat(device.qosListUpSpeed),
        labels: {
            deviceName: device.qosListHostname,
            deviceMac: device.qosListMac,
            connectionType: device.qosListConnectType,
        }
    };
};
