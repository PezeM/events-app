import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  UsePipes,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ValidationPipe } from '../shared/pipe/validation.pipe';
import { ParseObjectIdPipe } from '../shared/pipe/parseObjectId.pipe';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    const event = await this.eventService.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} does not exist!`);
    }

    return event;
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    const removedCharacter = await this.eventService.remove(id);
    if (!removedCharacter) {
      throw new NotFoundException(`Event with id ${id} does not exist!`);
    }

    return true;
  }
}
