import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {IProduct} from "../models/product";
import {ErrorService} from "./error.service";

@Injectable({providedIn: 'root'})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  fetchAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      'https://fakestoreapi.com/products',
      {
        params: new HttpParams().append('limit', 10)
      }
    ).pipe(
      retry(2),
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
