import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';

interface ForecastData {
  dateString: string,
  temp: number
}
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecast$: Observable<ForecastData[]>

  constructor(private forecastService: ForecastService) {
    this.forecast$ = forecastService.getForecast()
  }

  ngOnInit(): void {
  }

}
