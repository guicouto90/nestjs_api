import * as mongoose from 'mongoose';

export const BooksSchema = new mongoose.Schema({
  name: { type: String, required: true},
  price: {type: Number, required: true},
  username: {type: String, required: true}
});