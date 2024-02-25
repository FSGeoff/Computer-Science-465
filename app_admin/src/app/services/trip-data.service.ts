import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Trip } from '../models/trip'
import { response } from 'express'

@Injectable()
export class TripDataService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = 'http://localhost:3000/api/'
  private tripUrl = `${this.apiBaseUrl}trips`

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip')
    return this.http
      .post(this.tripUrl, formData)
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError)
  }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips')
    return this.http
      .get(`${this.tripUrl}`)
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handelError)
  }
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error)
    return Promise.reject(error.message || error)
  }
}
