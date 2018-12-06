import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceDashes'})

export class ReplaceDashes implements PipeTransform {
    transform(value: string): string {
      return value.replace(/-/g, ' ').toUpperCase();
    }
}
