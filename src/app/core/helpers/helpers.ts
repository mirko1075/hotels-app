import { Observable, of } from 'rxjs';
import { Hotel } from '../models/hotel.model';

export class NamebasedFinder<H extends Hotel> implements Finders<H> {
  getById(list: H[], id: number): Observable<H | undefined> {
    return of(list.find((myh) => myh.id === id));
  }

  getByName(list: H[], name: string): Observable<H[]> {
    return of(
      list.filter((myh) => myh.name.toLowerCase().includes(name.toLowerCase()))
    );
  }

  getExactMatchType(list: H[], name: string): Observable<H[]> {
    return of(list.filter((myh) => myh.name === name));
  }
}

export interface Finders<H> {
  getById(list: H[], id: number): Observable<H | undefined>;

  getByName(list: H[], name: string): Observable<H[] | undefined>;

  getExactMatchType(list: H[], name: string): Observable<H[] | undefined>;
}
