import { ToDoService } from './../to-do.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../users';
import { LoginComponent } from '../login/login.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  RegisterUser:Users = {
    username:'',
    email:'',
    password:''
  }
  confirmPassword:string = '';

  constructor(private registerService:ToDoService, private router:Router){}

  onRegister(){



    // check all field is filled
    if(!this.RegisterUser.username || !this.RegisterUser.email || !this.RegisterUser.password){
      alert("Please fill all the field")
      return;
    }
    // check password is match
    if(this.RegisterUser.password !== this.confirmPassword){
      alert("password do not match")
      return
    }

    //check if username exist
    this.registerService.checkIfUsernameIsExist(this.RegisterUser.username).subscribe(usernameResponse =>{
      if(usernameResponse.length >0 ){
        alert("username already exist please try someone")
        return
      }

      //check email if exist
      this.registerService.checkEmailIdIsExist(this.RegisterUser.email).subscribe(emailResponse => {
        if(emailResponse.length > 0){
          alert("email Id Exist. please try someone");
          return
        }



    // send registration data to the server
    this.registerService.registerUser(this.RegisterUser).subscribe((result)=>{
      // console.log("registration successful",result);
      alert("registration successfully")
    //  this. RegisterUser = {
    //     username:'',
    //     email:'',
    //     password:''
    //   }
    //   this.confirmPassword = '';
      this.router.navigate(['/login'])

    }

  );

});

});

}
}



