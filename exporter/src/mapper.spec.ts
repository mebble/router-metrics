import { DeviceOnline, DeviceMetricLabels } from './types';
import { downSpeedMetric, upSpeedMetric } from './mapper';

const baseInput: DeviceOnline = {
    qosListHostname: "hostname",
    qosListRemark: "",
    qosListIP: "ip",
    qosListConnectType: "conn-type",
    qosListMac: "mac",
    qosListUpSpeed: "1.3",
    qosListDownSpeed: "1.23",
    qosListDownLimit: "100.00",
    qosListUpLimit: "200.00",
    qosListAccess: "list-access",
};

describe('downSpeedMetric', () => {
    test('should map metric labels', () => {
        const expectedLabels: DeviceMetricLabels = {
            deviceName: baseInput.qosListHostname,
            deviceMac: baseInput.qosListMac,
            connectionType: baseInput.qosListConnectType
        };

        const metric = downSpeedMetric(baseInput);

        expect(metric.labels).toEqual(expectedLabels);
    });

    test('should map metric value from kilobytes per sec to bytes per sec', () => {
        const expectedValue = 1230;

        const metric = downSpeedMetric(baseInput);

        expect(metric.value).toEqual(expectedValue);
    });
});

describe('upSpeedMetric', () => {
    test('should map metric labels', () => {
        const expectedLabels: DeviceMetricLabels = {
            deviceName: baseInput.qosListHostname,
            deviceMac: baseInput.qosListMac,
            connectionType: baseInput.qosListConnectType
        };

        const metric = upSpeedMetric(baseInput);

        expect(metric.labels).toEqual(expectedLabels);
    });

    test('should map metric value', () => {
        const expectedValue = 1.3;

        const metric = upSpeedMetric(baseInput);

        expect(metric.value).toEqual(expectedValue);
    });
});
