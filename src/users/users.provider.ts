import { Connection } from 'mongoose';
import { UsersSchema } from './schemas/users.schema';

export const usersProvider = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) => connection.model('Users', UsersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];