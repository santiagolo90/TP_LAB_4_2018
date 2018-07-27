import { Decode64Pipe } from './decode64.pipe';

describe('Decode64Pipe', () => {
  it('create an instance', () => {
    const pipe = new Decode64Pipe();
    expect(pipe).toBeTruthy();
  });
});
