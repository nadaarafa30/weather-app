import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-wheather-home-page',
  templateUrl: './wheather-home-page.component.html',
  styleUrls: ['./wheather-home-page.component.scss']
})
export class WheatherHomePageComponent implements OnInit {
  myCountry='';
  Issearch=false;
  activeDay=0;
  changeToggle=false
  weatherData;mylatitude;mylongitude;Countryimage;
  stillLoading = true;
  countryName='';
  errorOccured=false;
  errorMessage="";
  searchTerm$ = new Subject<string>();
  constructor(private WeatherSer:WeatherService) {
    this.findme()    
  }

  ngOnInit() {

  }

  // ------------- this function to get the Country Name from latitude , Longitude ------------
  findme(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.WeatherSer.GetCountryFromLatLang(position.coords.latitude,position.coords.longitude).subscribe(data=>{
          this.mylongitude=position.coords.longitude;
          this.mylatitude=position.coords.latitude
          this.myCountry= data.json().countryName
          this.GetWeatherData(this.myCountry);
        },
        (err)=>{
          alert(err);
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  GetWeatherData(country){
      this.WeatherSer.GetWeatherDetils(country).subscribe(data =>{
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

  search(value){
    this.Issearch=true;
    this.countryName=value.target.value;  
    this.stillLoading = true;
    this.errorOccured=false;
    if(this.countryName.length < 1){
      this.GetWeatherData(this.myCountry);
      this.Issearch=false;
      
    }
    else{
      this.GetWeatherData(value.target.value);      
    }

    console.log(value.target.value);

  }

  activeDetails(index){
    this.activeDay=index;
    this.changeToggle= !this.changeToggle
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

  

}
