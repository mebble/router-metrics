import sinon from 'sinon';
import { speed } from './speed';
import { Gauge } from 'prom-client';

afterEach(() => {
    sinon.restore();
});

describe('set speed metric', () => {
    test('should not set gauge when no device metrics given', () => {
        const gauge = new Gauge({
            name: 'some_name',
            help: 'some_help'
        });
        const setSpy = sinon.spy(gauge, "set");
        const setSpeedMetric = speed(gauge);

        setSpeedMetric([]);

        expect(setSpy.notCalled).toBe(true);
    });
});
