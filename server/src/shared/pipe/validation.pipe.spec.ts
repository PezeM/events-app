import { ValidationPipe } from './validation.pipe';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateEventDto } from '../../event/dto/create-event.dto';

describe('ValidationPipe', () => {
  let target: ValidationPipe;

  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateEventDto,
    data: '',
  };

  beforeEach(() => {
    target = new ValidationPipe();
  });

  it('should throw an error on empty object', async () => {
    const dto = new CreateEventDto();

    await expect(async () => {
      await target.transform(dto, metadata);
    }).rejects.toThrowError(BadRequestException);
  });

  it('should throw an error on missing properties', async () => {
    const dto = new CreateEventDto();
    dto.firstName = 'Test name';

    await expect(async () => {
      await target.transform(dto, metadata);
    }).rejects.toThrowError(BadRequestException);
  });

  it('should validate existing properties', async () => {
    const dto = new CreateEventDto();
    dto.firstName = 'Test name';
    dto.lastName = 'Test name';
    dto.email = 'test@gmail.com';
    dto.eventDate = Date.now();

    const result = await target.transform(dto, metadata);

    expect(result).toBeDefined();
    expect(result).toMatchObject(dto);
  });
});
