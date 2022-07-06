import { Document } from 'mongoose';

export interface Book extends Document {
  readonly name: string;
  readonly price: number;
  readonly username: string;
}