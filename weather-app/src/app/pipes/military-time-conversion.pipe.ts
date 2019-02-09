import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'militaryTimeConversion'
})
export class MilitaryTimeConversionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var time = value+'';

        if(value.length > 0){
          if(value.length < 4){
            for(var i=0; i < 4-value.length; i++){
              value='0'+ value;              
            }
          }  
          time=  value.slice(0, 2) +':'+ value.slice(-2)
        }
      
        return time;
  }

}
