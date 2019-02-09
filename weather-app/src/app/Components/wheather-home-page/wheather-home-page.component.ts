import { Component,OnDestroy} from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subject,Subscription } from 'rxjs';

@Component({
  selector: 'app-wheather-home-page',
  templateUrl: './wheather-home-page.component.html',
  styleUrls: ['./wheather-home-page.component.scss']
})
export class WheatherHomePageComponent implements OnDestroy {
  myCountry='';
  Issearch=false;
  activeDay=0;
  changeToggle=false
  weatherData;mylatitude;mylongitude;Countryimage;
  stillLoading = true;
  countryName='';
  errorOccured=false;
  errorMessage="";
  results: Object;
  searchTerm$ = new Subject<string>();
  sub: Subscription;
  
  constructor(private WeatherSer:WeatherService) {
    this.findme()    
    
    this.sub= this.WeatherSer.GetWeatherDetils(this.searchTerm$).subscribe(data =>{
      this.weatherData= data.json();
      this.errorOccured=false;        
      if(!data.json().data['error']){
        this.errorOccured=false;          
        this.WeatherSer.GetCountryImage(this.weatherData.data.request[0].query).subscribe(data=>{
          this.Countryimage = data.json().results[0].urls.raw;
          this.stillLoading=false;
          console.log(this.weatherData.data);              
        },
        (err)=>{
          this.Countryimage = "../../../assets/imgs/weatherimage.png"
        });
      }
      else{
        this.errorOccured=true;
        this.errorMessage="Please search with Valid Name";
        this.stillLoading=false;
        
      }
    },
    (err)=>{
      this.errorOccured=true;
      this.errorMessage=err; 
      this.stillLoading=false;
      
    
    });
  }

  findme(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.WeatherSer.GetCountryFromLatLang(position.coords.latitude,position.coords.longitude).subscribe(data=>{
          this.mylongitude=position.coords.longitude;
          this.mylatitude=position.coords.latitude;
          this.myCountry= data.json().countryName;
          this.searchTerm$.next(this.myCountry)
          },
        (err)=>{
          alert(err);
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  search(value){
    this.Issearch=true;
    this.countryName=value.target.value;  
    this.stillLoading = true;
    this.errorOccured=false;
    if(this.countryName.length < 1){
      this.searchTerm$.next(this.myCountry)
      this.Issearch=false;
    }
    else{
      this.searchTerm$.next(value.target.value)
     }
  }

  activeDetails(index){
    this.activeDay=index;
    this.changeToggle= !this.changeToggle
  }

  scrollToDetails(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
