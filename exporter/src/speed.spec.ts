import sinon from 'sinon';
import { Gauge } from 'prom-client';
import { speed } from './speed';
import { DeviceMetric, DeviceMetricLabels } from './types';

const setupLabelsAndSet = (gauge: Gauge<keyof DeviceMetricLabels>) => {
    const gaugeInternal = gauge.labels();
    const labelsStub = sinon.stub(gauge, "labels");
    labelsStub.returns(gaugeInternal)
    const setSpy = sinon.spy(gaugeInternal, "set");

    return {
        labels: labelsStub,
        set: setSpy
    };
};

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
        const { labels, set } = setupLabelsAndSet(gauge);
        const setSpeedMetric = speed(gauge);

        setSpeedMetric([]);

        expect(labels.notCalled).toBe(true);
        expect(set.notCalled).toBe(true);
    });

    test('should set the gauge for every device metric given', () => {
        const { labels, set } = setupLabelsAndSet(gauge);
        const setSpeedMetric = speed(gauge);

        setSpeedMetric(devices);

        expect(labels.calledTwice).toBe(true);
        expect(set.calledTwice).toBe(true);
    });

    test('should set the gauge with device metric value and labels', () => {
        const { labels, set } = setupLabelsAndSet(gauge);
        const setSpeedMetric = speed(gauge);

        setSpeedMetric(devices);

        expect(labels.firstCall.calledWithExactly({
            deviceName: 'name1',
            deviceMac: 'mac1',
            connectionType: 'type1',
        })).toBe(true);
        expect(set.firstCall.calledWithExactly(10)).toBe(true);
        expect(labels.secondCall.calledWithExactly({
            deviceName: 'name2',
            deviceMac: 'mac2',
            connectionType: 'type2',
        })).toBe(true);
        expect(set.secondCall.calledWithExactly(20)).toBe(true);
    });
});
