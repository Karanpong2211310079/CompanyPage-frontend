import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'http://localhost:8000/api/employees/'

  constructor(private http:HttpClient) { }

   getEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
