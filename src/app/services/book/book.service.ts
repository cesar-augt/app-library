import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private _http: HttpClient) {}

  addBook(data: any): Observable<any> {
    return this._http.post('http://localhost:8888/api/default', data);
  }

  updateBook(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8888/api/default/${id}`, data);
  }

  getBookList(): Observable<any> {
    return this._http.get('http://localhost:8888/api/default');
  }

  deleteBook(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8888/api/default/${id}`);
  }
}
