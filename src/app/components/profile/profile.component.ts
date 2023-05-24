import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $ :any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  AllNotes:any
  TOKEN:any
  decoded:any
  isLoad=false
  Note_id: any
  isClicked=false
constructor( private _Router:Router , private _NotesService:NotesService){
 console.log('befoe')
 this.TOKEN  =  localStorage.getItem('token')

  this.decoded= jwt_decode(this.TOKEN)
  console.log("afteed")
  this.getAllNotes()
//  } catch (error) {
//   localStorage.clear()
//   this._Router.navigate(['/signin'])
//  }
 

}
AddNote = new FormGroup({
  title: new FormControl("",Validators.required),
  desc :new FormControl("",[Validators.required,Validators.minLength(5)])

})
EditNote = new FormGroup({
  title: new FormControl("",Validators.required),
  desc :new FormControl("",[Validators.required,Validators.minLength(5)])

})
getAllNotes(){
  console.log('get notes')
  var data={
    token:this.TOKEN,
    userID:this.decoded._id
 }

  this._NotesService.getAllNotes(data).subscribe(res=>{
    
    if(res.message=='success'){
      this.isLoad=true
      this.AllNotes=res.Notes
      
    }
     else{

       localStorage.clear()
    //   this._Router.navigate(['/signin'])
    }
   
  })
}
///////////////////////addnote
addData(){
  let data={
    title:this.AddNote.value.title,
    desc:this.AddNote.value.desc,
    citizenID:this.decoded._id,
    token:this.TOKEN

  }
  this._NotesService.addNote(data).subscribe(res=>{
    if(res.message == 'success'){
      $('#AddNote').modal('hide')
      this.getAllNotes()
      this.AddNote.reset()
    }
    console.log(res)
  })

}
////delete note
//getnote id
getId(id:any){
this.Note_id=id
console.log(this.Note_id)
}
//delete
deleteNote(){
  let data={
    NoteID:this.Note_id,
    token:this.TOKEN,
  }
this._NotesService.deleteNote(data).subscribe((res)=>{
if(res.message == 'deleted'){
  $('#DeleteNote').modal('hide')
  console.log(res)
  this.getAllNotes()
}
  })
}
/////////////////////////////edit note
//setvalue
setValue(){
  for (let index = 0; index <this.AllNotes.length; index++) { 
    if(this.AllNotes[index]._id == this.Note_id){
      console.log(this.AllNotes[index])
      this.EditNote.controls.title.setValue(this.AllNotes[index].title)
      this.EditNote.controls.desc.setValue(this.AllNotes[index].desc)
    }
   
    
  }
}
editData(){
  let data={
    token:this.TOKEN,
    title:this.EditNote.value.title,
    desc:this.EditNote.value.desc,
    NoteID:this.Note_id


  }
  this._NotesService.updateNote(data).subscribe(res=>{
console.log(res)
if(res.message == 'updated'){
  $('#EditNote').modal('hide')
  this.getAllNotes()
  

}
  })
}

}
