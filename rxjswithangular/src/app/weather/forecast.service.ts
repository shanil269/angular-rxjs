import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, toArray } from 'rxjs/operators'

interface OpenWeatherResponse {
  list: {
    dt_txt: string,
    main: {
      temp: number
    }
  }[]
}
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
          return new HttpParams()
            .set('lat', coords.latitude)
            .set('lon', coords.longitude)
            .set('appid', '1d8aaf55e6c3d2604e2485fd2296570e') // openweathermap
            // .set('q', coords.latitude).append('q', coords.longitude)
            .set('units', 'metric')
        }),
        switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params })),
        map(owr => owr.list),
        mergeMap(value => of(...value)),
        filter((value, index) => index % 8 === 0),
        map(value => {
          return {
            dateString: value.dt_txt,
            temp: value.main.temp
          }
        }),
        toArray()
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
