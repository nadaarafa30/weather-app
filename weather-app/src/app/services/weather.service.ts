import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: Http) { }
  

  GetWeatherDetils(country) {
    return this.http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?key=8f421d1cf1d441f4b9a170455190302&'+'q='+country+'&num_of_days=7&tp=3&format=json');
  }

  GetCountryFromLatLang(Lat,Lang){
    return this.http.get('http://api.geonames.org/countryCodeJSON?lat='+Lat+'&lng='+Lang+'&username=nada')
  }

  GetCountryImage(country){
    return this.http.get('https://api.unsplash.com/search/photos/?page=1&query='+country+'&client_id=259578af7aed9ec1075a3abacf7776366a051492575272fe73527b2724bc6de0');    
  }
}