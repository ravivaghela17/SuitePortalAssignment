import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaintenanceRequestApiService } from '../../services/maintenance-api.service';
import { catchError, first, map, tap } from 'rxjs/operators';
import { MaintenanceRequest, Response } from '@suiteportal/api-interfaces';
import { ERROR_MESSAGES, SNACK_BAR_TYPES } from '../../constants';
import { UtilService } from '../../services/util.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'sp-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'unitNumber',
    'serviceType',
    'summary',
    'details',
    'action',
  ];
  requestes$: Observable<MaintenanceRequest[]>;

  constructor(
    private readonly utilService: UtilService,
    private readonly maintenanceRequestApiService: MaintenanceRequestApiService
  ) {}

  ngOnInit(): void {
    this.requestes$ = this.getAllOpenMaintenanceRequests();
  }
  getAllOpenMaintenanceRequests(): Observable<MaintenanceRequest[]> {
    return this.maintenanceRequestApiService.getOpenMaintenanceRequest().pipe(
      first(),
      map(
        (response: Response) =>
          (response.data?.requests as MaintenanceRequest[]) ?? []
      ),
      catchError((error) => {
        const errorMessage = error?.message
          ? error.message
          : ERROR_MESSAGES.REQUEST_FAILURE;
        this.utilService.openSnackBar(SNACK_BAR_TYPES.ERROR, errorMessage);
        return of([]);
      })
    );
  }
}
