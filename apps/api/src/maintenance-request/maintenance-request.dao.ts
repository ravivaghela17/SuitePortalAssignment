import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MaintenanceRequest, Response } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';
import { HTTP_CODES } from '../app/constants';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json');
const db = low(adapter);

db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {
  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  async insertNewRequest(
    maintenanceRequest: MaintenanceRequest
  ): Promise<Response> {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        submittedAt: new Date(),
      })
      .write();

    return {
      code: HTTP_CODES[200].code,
      message: HTTP_CODES[200].message,
      data: {
        id: id,
      },
    };
  }

  async getOpenMaintenances(): Promise<Response> {
    await db.read();
    const requests = this.collection.value();
    if (!requests) {
      throw new HttpException(
        {
          code: HTTP_CODES[404].code,
          message: HTTP_CODES[404].message,
          data: {
            requests: [],
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    return {
      code: HTTP_CODES[200].code,
      message: HTTP_CODES[200].message,
      data: {
        requests: requests,
      },
    };
  }

  async getMaintenanceRequest(id: string): Promise<Response> {
    await db.read();

    const request = this.collection.find({ id }).value();
    if (!request) {
      throw new HttpException(
        {
          code: HTTP_CODES[404].code,
          message: HTTP_CODES[404].message,
          data: {
            id: id,
          },
        },
        HttpStatus.NOT_FOUND
      );
    }
    return {
      code: HTTP_CODES[200].code,
      message: HTTP_CODES[200].message,
      data: {
        request: request,
      },
    };
  }
}
