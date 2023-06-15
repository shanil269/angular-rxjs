import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  // private url = 'http://api.weatherapi.com/v1/forecast.json?'
  private url = 'https://api.openweathermap.org/data/2.5/forecast'

  constructor(private http: HttpClient) { }

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          console.log(coords.latitude)
          console.log(coords.longitude)
          return new HttpParams()
            .set('lat', coords.latitude)
            .set('lon', coords.longitude)
            .set('key', '1d8aaf55e6c3d2604e2485fd2296570e')
          // .set('q', coords.latitude).append('q', coords.longitude)

          // .set('units', 'metric')
        }),
        switchMap(params => this.http.get(this.url, { params }))
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
