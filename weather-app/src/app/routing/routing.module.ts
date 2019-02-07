import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WheatherHomePageComponent } from 'src/app/Components/wheather-home-page/wheather-home-page.component';

const routes: Routes = [
  
    {
      path: '', component:WheatherHomePageComponent
    }
  ];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class RoutingModule { }
