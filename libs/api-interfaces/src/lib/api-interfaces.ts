export enum ServiceType {
  Electrical = 'electrical',
  General = 'general',
  PestControl = 'pest-control',
  Plumbing = 'plumbing',
}

export const ALL_SERVICE_TYPES = [
  ServiceType.Electrical,
  ServiceType.General,
  ServiceType.PestControl,
  ServiceType.Plumbing,
];

export enum RequestStatus {
  open = 'open',
  close = 'close',
}

export const ALL_REQUEST_STATUSES = {
  open: RequestStatus.open,
  close: RequestStatus.close,
};

export interface MaintenanceRequest {
  // Name of the requester
  name: string;
  // Email of the requester
  email: string;
  // The unit # in the building
  unitNumber: string;
  // The type of service being requested
  serviceType: ServiceType;
  // A summary of of the issue
  summary: string;
  // Any extra details
  details?: string;
  // Request status
  status: RequestStatus;
}
export interface User {
  email: string;
  password: string;
}
export interface Response {
  code: number;
  message: string;
  data: any;
}
