import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  countryName= '';
  constructor() { }

  ngOnInit() {
  }

  search(value){
    this.countryName=value.target.value;  
    console.log(value.target.value);
  }

}
