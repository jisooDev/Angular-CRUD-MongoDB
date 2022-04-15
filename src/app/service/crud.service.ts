import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

export class Book{
  _id!:String;
  name!:String;
  price!:String;
  description!:String;
}
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Node/Express API
  REST_API:string = 'http://localhost:8000/api'

  //HTTP header
  HttpHeaders = new HttpHeaders().set('Content-Type','application/json')
  constructor(private HttpClient: HttpClient) { }

  //Add
  AddBook(data: Book): Observable<any>{
    let API_URL = `${this.REST_API}/add-book`;
    return this.HttpClient.post(API_URL, data)
    .pipe(
      catchError(this.handleError)
    )

  }
  //Get All object
  GetBooks(){
    return this.HttpClient.get(`${this.REST_API}`);
  }

  //Get single object
  GetBook(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/read-book/${id}`
    return this.HttpClient.get(API_URL, { headers: this.HttpHeaders})
    .pipe(map((res:any)=>{
      return res || {}
    }), 
    catchError(this.handleError)
    )
  }

  //Update
  updateBook(id:any, data:any): Observable<any>{
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.HttpClient.put(API_URL, data, {headers: this.HttpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }

  //Delete book
  deleteBook(id:any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-book/${id}`
    return this.HttpClient.delete(API_URL, {headers: this.HttpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }


  // Error
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      // Handle client error
      errorMessage = error.error.message;
    }else{
      //handle server
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
