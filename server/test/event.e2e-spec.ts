import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { EventService } from '../src/event/event.service';
import { getModelToken } from '@nestjs/mongoose';
import { Event } from '../src/event/schemas/event.schema';
import { EventController } from '../src/event/event.controller';
import { CreateEventDto } from '../src/event/dto/create-event.dto';
import * as mongoose from 'mongoose';

describe('Events', () => {
  let app: INestApplication;

  const validId = '60d892463fadee01f0d430e1';
  const eventList = [
    {
      id: new mongoose.Types.ObjectId().toString(),
      firstName: 'FirstName2',
      lastName: 'LastName2',
      email: 'email2@gmail.com',
      eventDate: 150,
    },
    {
      id: validId,
      firstName: 'FirstName2',
      lastName: 'LastName2',
      email: 'email2@gmail.com',
      eventDate: 150,
    },
  ];

  const eventService = {
    findAll: () => eventList,
    findOne: (id: string) => eventList.find((e) => e.id == id),
    create: () => {
      const newEvent = {
        id: new mongoose.Types.ObjectId().toString(),
        firstName: 'FirstName2',
        lastName: 'LastName2',
        email: 'email2@gmail.com',
        eventDate: 150,
      };

      eventList.push(newEvent);
      return newEvent;
    },
    remove: (id: string) => {
      const index = eventList.findIndex((e) => e.id == id);
      if (index < 0) return false;
      eventList.splice(index, 1);
      return true;
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
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
        {
          provide: EventService,
          useValue: eventService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/GET', () => {
    it(`should return all events`, () => {
      return request(app.getHttpServer())
        .get('/event')
        .expect(200)
        .expect(eventService.findAll());
    });

    it(`by ID should throw an error if invalid ID format was passed`, () => {
      const invalidId = '1';

      return request(app.getHttpServer())
        .get(`/event/${invalidId}`)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toBeDefined();
          expect(body.message).toEqual('Invalid Id format');
        });
    });

    it(`by ID should return one event`, () => {
      return request(app.getHttpServer())
        .get(`/event/${validId}`)
        .expect(eventService.findOne(validId))
        .expect(200);
    });
  });

  describe('/POST', () => {
    it('should return created event', () => {
      const newEvent = eventService.create();

      return request(app.getHttpServer())
        .post('/event')
        .set('Accept', 'application/json')
        .send(newEvent)
        .expect(({ body }) => {
          expect(body.id).not.toEqual(newEvent.id);
          expect(body.firstName).toEqual(newEvent.firstName);
          expect(body.lastName).toEqual(newEvent.lastName);
          expect(body.email).toEqual(newEvent.email);
          expect(body.eventDate).toEqual(newEvent.eventDate);
        })
        .expect(HttpStatus.CREATED);
    });

    it('should throw an error on invalid event data', () => {
      const invalidCreateEventDto: CreateEventDto = {
        firstName: 'a',
        lastName: 'b',
        email: 'email',
        eventDate: -1,
      };

      return request(app.getHttpServer())
        .post('/event')
        .set('Accept', 'application/json')
        .send(invalidCreateEventDto)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toBeDefined();
          expect(body.message).toEqual('Validation failed');
        });
    });
  });

  describe('/DELETE', () => {
    it('should return true if deleted event successfully', () => {
      return request(app.getHttpServer())
        .delete(`/event/${validId}`)
        .expect(200)
        .expect('true');
    });

    it('should throw an error if event by id was not found', () => {
      const id = mongoose.Types.ObjectId().toString();
      return request(app.getHttpServer())
        .delete(`/event/${id}`)
        .expect(404)
        .expect(({ body }) => {
          expect(body).toBeDefined();
          expect(body.message).toEqual(`Event with id ${id} does not exist!`);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
