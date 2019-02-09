import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { debounceTime, map,distinctUntilChanged,switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: Http) { }
  
  GetWeatherDetils(terms : Observable<string>) {
    return terms.pipe(debounceTime(500)
      ,distinctUntilChanged()
      ,switchMap(term => this.search(term)));
  }

  search(country) {
    return this.http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?key=c8a7d5852e7c4ed6bf8151814190902&'+'q='+country+'&num_of_days=7&tp=1&format=json');
  }

  GetCountryFromLatLang(Lat,Lang){
    return this.http.get('http://api.geonames.org/countryCodeJSON?lat='+Lat+'&lng='+Lang+'&username=nada')
  }
  
  GetCountryImage(country) {
    return this.http.get('https://api.unsplash.com/search/photos/?page=1&query='+country+'&client_id=259578af7aed9ec1075a3abacf7776366a051492575272fe73527b2724bc6de0');    
    
  }
}
