import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event {
  @Prop({ required: true })
  /**
   * Name of the user adding the event
   */
  firstName: string;

  @Prop({ required: true })
  /**
   * LName of the user adding the event
   */
  lastName: string;

  @Prop({ required: true })
  /**
   * Email of the user adding the event
   */
  email: string;

  @Prop({ required: true })
  /**
   * Date of the event, timestamp in ms
   */
  eventDate: number;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
