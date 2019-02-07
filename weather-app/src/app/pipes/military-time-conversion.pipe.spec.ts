import { MilitaryTimeConversionPipe } from './military-time-conversion.pipe';

describe('MilitaryTimeConversionPipe', () => {
  it('create an instance', () => {
    const pipe = new MilitaryTimeConversionPipe();
    expect(pipe).toBeTruthy();
  });
});
