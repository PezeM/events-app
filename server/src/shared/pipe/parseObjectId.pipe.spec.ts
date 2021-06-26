import { ParseObjectIdPipe } from './parseObjectId.pipe';
import { Types } from 'mongoose';

describe('ParseObjectIdPipe', () => {
  let target: ParseObjectIdPipe;

  const invalidObjectId = '60d7598cdd4b270d558d9eb533';
  const validObjectId = '60d7598cdd4b270d558d9eb5';

  beforeEach(() => {
    target = new ParseObjectIdPipe();
  });

  it('should throw on invalid object id', () => {
    expect(() => {
      target.transform(invalidObjectId);
    }).toThrowError();
  });

  it('should transform valid string id to object id', () => {
    const result = target.transform(validObjectId);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Types.ObjectId);
  });
});
