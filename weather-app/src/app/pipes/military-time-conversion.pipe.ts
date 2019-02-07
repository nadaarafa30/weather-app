import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'militaryTimeConversion'
})
export class MilitaryTimeConversionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var time = value+'';

        if(value.length > 1){
          if(value.length < 4){
            value='0'+ value;
          }  
          time=  value.slice(0, 2) +':'+ value.slice(-2)
        }
      
        return time;
  }

}
