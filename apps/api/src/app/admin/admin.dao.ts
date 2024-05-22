import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

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
  async validateUser(email: string, password: string): Promise<User> {
    await db.read();

    const user = this.users.find({ email, password }).value();

    //user not found
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
