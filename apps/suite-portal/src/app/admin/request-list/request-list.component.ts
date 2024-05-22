import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaintenanceRequestApiService } from '../../services/maintenance-api.service';
import { catchError, first, map, tap } from 'rxjs/operators';
import { MaintenanceRequest, Response } from '@suiteportal/api-interfaces';
import { ERROR_MESSAGES, SNACK_BAR_TYPES } from '../../constants';
import { UtilService } from '../../services/util.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
interface MaintenanceRequestModel extends MaintenanceRequest {
  id: string;
}
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
  private requestsSubject = new BehaviorSubject<MaintenanceRequestModel[]>([]);
  public requests$ = this.requestsSubject.asObservable();

  constructor(
    private readonly utilService: UtilService,
    private readonly maintenanceRequestApiService: MaintenanceRequestApiService
  ) {}

  ngOnInit(): void {
    this.getAllOpenMaintenanceRequests();
  }
  closeRequest(id: string): void {
    if (!id) {
      this.utilService.openSnackBar(
        SNACK_BAR_TYPES.ERROR,
        ERROR_MESSAGES.REQUEST_FAILURE
      );
      return;
    }
    if (confirm('Are you sure to close the request ')) {
      this.maintenanceRequestApiService
        .closeMaintenanceRequest(id)
        .pipe(
          tap((response) => {
            if (response) {
              const currentRequests = this.requestsSubject.value;
              const updatedRequests = currentRequests.filter(
                (request) => request.id !== id
              );
              this.requestsSubject.next(updatedRequests);
            }
          }),
          catchError((error) => {
            const errorMessage = error?.message
              ? error.message
              : ERROR_MESSAGES.REQUEST_FAILURE;
            this.utilService.openSnackBar(SNACK_BAR_TYPES.ERROR, errorMessage);
            return error;
          })
        )
        .subscribe();
    }
  }
  getAllOpenMaintenanceRequests(): void {
    this.maintenanceRequestApiService
      .getOpenMaintenanceRequest()
      .pipe(
        first(),
        map(
          (response: Response) =>
            (response.data?.requests as MaintenanceRequestModel[]) ?? []
        ),
        tap((requests: MaintenanceRequestModel[]) =>
          this.requestsSubject.next(requests)
        ),
        catchError((error) => {
          const errorMessage = error?.message
            ? error.message
            : ERROR_MESSAGES.REQUEST_FAILURE;
          this.utilService.openSnackBar(SNACK_BAR_TYPES.ERROR, errorMessage);
          return of([]);
        })
      )
      .subscribe();
  }
}
