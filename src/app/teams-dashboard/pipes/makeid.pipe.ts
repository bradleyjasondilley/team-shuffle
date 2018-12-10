import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'makeid'
})
export class MakeidPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.toLowerCase().replace(/\s/g, "");
  }

}
