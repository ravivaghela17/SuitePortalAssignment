import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Response } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { HTTP_CODES } from '../constants';

const adapter = new FileSync<User>('./db/users.json');
const db = low(adapter);

db.defaults({
  users: [
    {
      email: 'admin@admin.com',
      password: 'Pa$sw0rd',
    },
  ],
}).write();

@Injectable()
export class AdminDao {
  private get users(): any {
    return db.get('users');
  }
  async validateUser(email: string, password: string): Promise<Response> {
    await db.read();

    const user = this.users.find({ email, password }).value();

    //user not found
    if (!user) {
      throw new HttpException(
        {
          code: HTTP_CODES[404].code,
          message: 'Invalid email or password',
          data: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return {
      code: HTTP_CODES[200].code,
      message: HTTP_CODES[200].message,
      data: {
        user: user.email,
      },
    };
  }
}
