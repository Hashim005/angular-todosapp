import { Users } from './users';
import { ToDo } from './to-do';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  getApiUrl = "http://localhost:3000/todoTask";
  getByIdApiUrl = "http://localhost:3000/todoTask/";
  addToDoApiUrl = "http://localhost:3000/todoTask";
  updateToDoApiUrl = "http://localhost:3000/todoTask/";
  deleteToDoApiUrl = "http://localhost:3000/todoTask/";

  registerUserApiUrl = " http://localhost:3000/user";
  authenticateUserApiUrl = "http://localhost:3000/user?email="
  checkUserNameExistApiUrl = "http://localhost:3000/user?username=";
  checkEmailIdExistApiUrl = "http://localhost:3000/user?email=";
  constructor(private http:HttpClient) { }
  getToDoList(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.getApiUrl);
  }
  getToDoById(id:string){
   return  this.http.get<ToDo>(this.getByIdApiUrl+id)
  }
  addToDo(toDo:ToDo){
   return  this.http.post(this.addToDoApiUrl,toDo)
  }
  updateToDo(toDo:ToDo){
    return this.http.put(this.updateToDoApiUrl+toDo.id,toDo)
  }
  deleteToDo(todoItemId:string | undefined){
    return this.http.delete(this.deleteToDoApiUrl + todoItemId)
  }

  registerUser(user:Users){
    return this.http.post(this.registerUserApiUrl,user)

  }

  authenticateUser(email:string,password:string){
    return this.http.get<Users []>(this.authenticateUserApiUrl + email+"&password=" + password);
  }

  checkIfUsernameIsExist(username:string){
   return  this.http.get<Users[]>(this.checkUserNameExistApiUrl+username)
  }

  checkEmailIdIsExist(email:string){
    return this.http.get<any[]>(this.checkEmailIdExistApiUrl+email)

  }

}
