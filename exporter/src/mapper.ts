import { DeviceOnline, DeviceMetric } from './types';

export const downSpeedMetric = (device: DeviceOnline): DeviceMetric => {
    return {
        value: parseFloat(device.qosListDownSpeed) * 1000,
        labels: {
            device_name: device.qosListHostname,
            device_mac: device.qosListMac,
            connection_type: device.qosListConnectType,
        }
    };
};

export const upSpeedMetric = (device: DeviceOnline): DeviceMetric => {
    return {
        value: parseFloat(device.qosListUpSpeed) * 1000,
        labels: {
            device_name: device.qosListHostname,
            device_mac: device.qosListMac,
            connection_type: device.qosListConnectType,
        }
    };
};
