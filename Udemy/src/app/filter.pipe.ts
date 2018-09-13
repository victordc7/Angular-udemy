import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string ): any {
    if (value.lenght === 0 || filterString === '') {
      return value;
    }

    const a = filterString.toUpperCase();
    const resultArray = [];

    for ( const item of value) {
      const b = item[propName].toUpperCase();
      const index = b.indexOf(a);
      if ( index >= 0 ) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }

}
