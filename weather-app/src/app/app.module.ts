import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from 'src/app/routing/routing.module';
import { HeaderComponent } from './Components/header/header.component';
import { WheatherHomePageComponent } from './Components/wheather-home-page/wheather-home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WheatherHomePageComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
