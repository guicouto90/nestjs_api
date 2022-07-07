import { Document } from 'mongoose';

export interface Book extends Document {
  name: string;
  price: number;
  username: string;
}