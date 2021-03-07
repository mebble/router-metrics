import sinon from 'sinon';
import { Gauge } from 'prom-client';
import { speed } from './speed';
import { DeviceMetric } from './types';

afterEach(() => {
    sinon.restore();
});

describe('set speed metric', () => {
    const gauge = new Gauge({
        name: 'some_name',
        help: 'some_help'
    });
    const devices: DeviceMetric[] = [
        {
            value: 10,
            labels: {
                deviceName: 'name1',
                deviceMac: 'mac1',
                connectionType: 'type1',
            }
        },
        {
            value: 20,
            labels: {
                deviceName: 'name2',
                deviceMac: 'mac2',
                connectionType: 'type2',
            }
        },
    ];

    test('should not set gauge when no device metrics given', () => {
        const setSpy = sinon.spy(gauge, "set");
        const setSpeedMetric = speed(gauge);

        setSpeedMetric([]);

        expect(setSpy.notCalled).toBe(true);
    });

    test('should set the gauge for every device metric given', () => {
        const setSpy = sinon.spy(gauge, "set");
        const setSpeedMetric = speed(gauge);

        setSpeedMetric(devices);

        expect(setSpy.calledTwice).toBe(true);
    });
});
