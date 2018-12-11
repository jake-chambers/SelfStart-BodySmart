import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], letter: string): any[] {
    console.log(letter);
    if(!items) return [];
    if(!letter) return items;
    letter = letter.toLowerCase();
    return items.filter( it => {
        return it.name.toLowerCase().substring(0,1).includes(letter);
    });
   }
}
