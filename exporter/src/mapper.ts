import { DeviceOnline, DeviceMetric } from './types';

export const downSpeedMetric = (device: DeviceOnline): DeviceMetric => {
    return {
        value: 12,
        labels: {
            deviceName: device.qosListHostname,
            deviceMac: device.qosListMac,
            connectionType: device.qosListConnectType,
        }
    };
};
