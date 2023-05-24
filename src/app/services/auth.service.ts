import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BaseUrl="https://sticky-note-fe.vercel.app/"
  constructor(private _httpClient:HttpClient) { }
  signUp(data:any):Observable<any>{
    return this._httpClient.post(this.BaseUrl+'signup',data)
   }
   signIn(data:any):Observable<any>{
     return this._httpClient.post(this.BaseUrl+'signin',data)
   }
   signOut(data:any):Observable<any>{
     return this._httpClient.post(this.BaseUrl+'signOut',data)
   }
   isLoggedIn():any{
     return !!localStorage.getItem('token')
   }
}
