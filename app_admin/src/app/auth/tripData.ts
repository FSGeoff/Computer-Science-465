import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'models/trip';
import { User } from '../models/user';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class TripData {

  constructor(private http: HttpClient,
              @Inject('LOCAL_STORAGE') private localStorage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.http
      .post<Trip>(this.tripUrl, formData)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get<Trip>(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get<Trip[]>(`${this.apiBaseUrl}trips`)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put<Trip>(this.tripUrl + formData.code, formData)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<Auth> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<Auth> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<Auth> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post<Auth>(url, user)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
