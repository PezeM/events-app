import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { NotFoundException } from '@nestjs/common';

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

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(eventList),
            findOne: jest
              .fn()
              .mockImplementation((id: string) =>
                Promise.resolve(mockEvent({ id })),
              ),
            create: jest
              .fn()
              .mockImplementation((event: CreateEventDto) =>
                Promise.resolve(mockEvent({ id: '1', ...event })),
              ),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list of events on /GET', () => {
    expect(controller.findAll()).resolves.toEqual(eventList);
    expect(service.findAll).toBeCalled();
  });

  describe('/GET/:id', () => {
    it('should return single event by id', () => {
      expect(controller.findOne('321')).resolves.toEqual(mockEvent());
      expect(service.findOne).toBeCalled();
    });

    it('should throw an error on if event not found', () => {
      service.findOne = jest.fn().mockReturnValueOnce(undefined);

      expect(controller.findOne('dbbbg')).rejects.toThrow(NotFoundException);
      expect(service.findOne).toBeCalled();
    });
  });

  describe('/POST', () => {
    it('should create new event on /POST', () => {
      const newEventDto: CreateEventDto = {
        firstName: 'FirstName',
        lastName: 'LastName',
        eventDate: 3212,
        email: 'mail@gmail.com',
      };

      expect(controller.create(newEventDto)).resolves.toEqual(
        mockEvent({ id: '1', ...newEventDto }),
      );
      expect(service.create).toBeCalled();
    });
  });

  describe('/DELETE/:id', () => {
    it('should return true if event was deleted by id', () => {
      expect(controller.remove('321')).resolves.toEqual(true);
      expect(service.remove).toBeCalled();
    });

    it('should throw an error if event was not found', () => {
      service.remove = jest.fn().mockReturnValueOnce(false);

      expect(controller.remove('dbbbg')).rejects.toThrow(NotFoundException);
      expect(service.remove).toBeCalled();
    });
  });
});
