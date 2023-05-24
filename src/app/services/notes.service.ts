import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  BaseUrl="https://sticky-note-fe.vercel.app/"
  constructor( private _HttpClient:HttpClient ) { }
  getAllNotes(data:any):Observable<any>{
    return this._HttpClient.post(this.BaseUrl + 'getUserNotes', data);
  }
  addNote(data:any):Observable<any>{
    return this._HttpClient.post(this.BaseUrl + 'addNote', data);
  }
  deleteNote(data:any):Observable<any>{
    let options={
      
      body:{
        NoteID:data.NoteID,
        token:data.token
      }
    }
    return this._HttpClient.delete(this.BaseUrl + 'deleteNote', options);
  }
  updateNote(data:any):Observable<any>{
    return this._HttpClient.put(this.BaseUrl + 'updateNote', data);
  }
}
