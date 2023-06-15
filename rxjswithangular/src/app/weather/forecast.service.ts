import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor() { }

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', coords.latitude)
            .set('lon', coords.longitude)
            .set('appid', '1d8aaf55e6c3d2604e2485fd2296570e')
            .set('units', 'metric')
        })
      )
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords)
          observer.complete()
        },
        (err) => observer.error(err)
      )
    })
  }
}
