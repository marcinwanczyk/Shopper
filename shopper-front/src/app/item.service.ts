import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'http://localhost:8080/items'
  private counter = 0;

  constructor(private http: HttpClient) {
    const storedCounter = localStorage.getItem('counter');
    if (storedCounter) {
      this.counter = parseInt(storedCounter);
    }
  }

  getAllItems(): Observable<Item[]> {
    this.counter++;
    return this.http.get<Item[]>(`${this.baseUrl}`);
  }

  getItemById(id: number): Observable<Item> {
    this.counter++;
    return this.http.get<Item>(`${this.baseUrl}/${id}`);
  }

  addItem(item: Item): Observable<Item> {
    this.counter++;
    return this.http.post<Item>(`${this.baseUrl}`, item);
  }

  editItem(id: number, item: Item): Observable<Item> {
    this.counter++;
    this.saveCounter();
    return this.http.put<Item>(`${this.baseUrl}/${id}`, item);
  }

  deleteItem(id: number | undefined): Observable<void> {
    this.counter++;
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCounter(): Observable<number> {
    return new Observable<number>((observer) => {
      observer.next(this.counter);
      observer.complete();
    });
  }

  saveCounter(): void {
    localStorage.setItem('counter', this.counter.toString());
  }


}
