import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getModelToken } from '@nestjs/mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';

const mockEvent = (data?: Partial<EventDocument>): Partial<EventDocument> => {
  return {
    _id: data?.id ?? '321',
    firstName: data?.firstName ?? 'First name',
    lastName: data?.lastName ?? 'Last name',
    email: data?.email ?? 'email@gmail.com',
    eventDate: data?.eventDate ?? 100,
  };
};

const eventList = [
  mockEvent(),
  mockEvent({
    id: '1',
    firstName: 'FirstName2',
    lastName: 'LastName2',
    email: 'email2@gmail.com',
    eventDate: 150,
  }),
];

describe('EventService', () => {
  let service: EventService;
  let model: Model<EventDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getModelToken(Event.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    model = module.get<Model<EventDocument>>(getModelToken(Event.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new event', async () => {
    const createEventDto: CreateEventDto = {
      firstName: 'FirstName',
      lastName: 'LastName',
      eventDate: 3212,
      email: 'mail@gmail.com',
    };

    const createdEvent = mockEvent(createEventDto);
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(createdEvent));

    const result = await service.create(createEventDto);
    expect(result).toEqual(createdEvent);
  });

  it('should return all events', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(eventList),
    } as any);

    const result = await service.findAll();
    expect(result).toEqual(eventList);
  });

  it('should findOne event by id', async () => {
    const eventId = '3';
    const eventToFind = mockEvent({ id: eventId, firstName: 'D' });

    jest.spyOn(model, 'findById').mockReturnValueOnce(eventToFind as any);

    const result = await service.findOne(eventId);
    expect(result).toEqual(eventToFind);
  });

  it('should delete event and return true', async () => {
    const eventId = '3';
    jest
      .spyOn(model, 'deleteOne')
      .mockReturnValueOnce({ deletedCount: 1 } as any);

    const result = await service.remove(eventId);
    expect(result).toEqual(true);
  });

  it('should return false when event was not deleted', async () => {
    const eventId = '3';
    jest
      .spyOn(model, 'deleteOne')
      .mockReturnValueOnce({ deletedCount: 0 } as any);

    const result = await service.remove(eventId);
    expect(result).toEqual(false);
  });
});
