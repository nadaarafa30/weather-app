import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-wheather-home-page',
  templateUrl: './wheather-home-page.component.html',
  styleUrls: ['./wheather-home-page.component.scss']
})
export class WheatherHomePageComponent implements OnInit {
  myCountry='';
  weatherData;
  mylatitude;
  mylongitude;
  Countryimage;
  stillLoading = true;
  countryName='';
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
          console.log(this.myCountry);
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
        this.WeatherSer.GetCountryImage(this.weatherData.data.request[0].query).subscribe(data=>{
          this.Countryimage = data.json().results[0].urls.raw;
          this.stillLoading=false;
        },
        (err)=>{
          alert(err);
        });

        console.log(this.weatherData.data);
      },
      (err)=>{
        alert(err);
      });
  }

  search(value){
    this.countryName=value.target.value;  
    this.stillLoading = true;
    console.log(this.countryName.length);
    if(this.countryName.length < 1){
      this.GetWeatherData(this.myCountry);
      console.log('serch');
    }
    else{
      this.GetWeatherData(value.target.value);
      console.log('No serch');
      
    }

    console.log(value.target.value);

  }
  

}
