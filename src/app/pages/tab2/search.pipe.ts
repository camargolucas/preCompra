import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], terms: string): any[] {
    terms = terms.toLowerCase();
    return items.filter(it => {
      return it.nome.toLowerCase().startsWith(terms); // only filter country name
    });
  }
}
