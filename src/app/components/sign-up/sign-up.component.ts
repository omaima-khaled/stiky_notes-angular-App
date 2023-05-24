import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
declare var $ :any
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isStyleInvalid:any={'background-color':'gray','border-color':'gray'};
  isStylevalid:any={'background-color':'#17a2b8','border-color':'#17a2b8'};
  isClicked=false;
  
  responcemessage=""
  uniqmessage=""
  isSuccess=false
  isRepeated=false
 
  constructor( private _AuthService:AuthService){
   
  }
  registerform=new FormGroup({
    first_name:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[]?[a-z]+['-]?)+$/),Validators.minLength(3),Validators.maxLength(8)]),
    last_name :new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[]?[a-z]+['-]?)+$/),Validators.minLength(3),Validators.maxLength(8)]),
    email:new FormControl('',[Validators.email,Validators.required]),
    age :new FormControl('',[Validators.pattern('([2-7][0-9]|80)'),Validators.required]),
    password:new FormControl('',[Validators.pattern("^[A-z]{3}"),Validators.required])
  }) 
  register(){
    this.isClicked=true;
    if(this.registerform.valid){
      this._AuthService.signUp(this.registerform.value).subscribe((responce)=>{
       if(responce.message =='success'){
         this.registerform.reset()
         this.responcemessage=responce.message
         this.isClicked=false
         this.isRepeated=false
         this.isSuccess=true
         setInterval(()=>{$('#sucess').slideUp(),1000},2000)
       }
       else{
        this.uniqmessage=responce.errors.email.message
        this.isClicked=false
        this.isRepeated=true
        this.isSuccess=false
        setInterval(()=>{$('#repeated').slideUp(),1000},2000)
       }
        console.log(responce)

      })
     
      

     
    }
  
  }
 
 ngOnInit(){
  $('#signUp').particleground()
 }

}
