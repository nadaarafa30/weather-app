import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from 'src/app/routing/routing.module';
import { HeaderComponent } from './Components/header/header.component';
import { WheatherHomePageComponent } from './Components/wheather-home-page/wheather-home-page.component';
import { HttpModule } from '@angular/http';
import { MilitaryTimeConversionPipe } from './pipes/military-time-conversion.pipe';
import { LoadingComponent } from './Components/loading/loading.component';
import { ErrorSectionComponent } from './Components/error-section/error-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WheatherHomePageComponent,
    MilitaryTimeConversionPipe,
    LoadingComponent,
    ErrorSectionComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
