import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../users';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginUser = {
  email:'',
  password:'',

}
constructor(private loginService:ToDoService,private router:Router){

}

onLogin(){
  if(!this.loginUser.email || !this.loginUser.password){
    alert("please fill the Login field")
    return
  }

  this.loginService.authenticateUser(this.loginUser.email,this.loginUser.password).subscribe((result)=>{
    //  console.log("login successfully",result);
    if(result.length > 0){
      // console.log("login successful",result);

      //redirect to home
      this.router.navigate(['/home']);

    }
    else{
      alert("Invalid user or password");
      this.loginUser = {
        email:'',
        password:'',

      }
    }


  },
error =>{
  console.error("Login error",error);
  alert("Login failed. please try again ");



});

}


}
