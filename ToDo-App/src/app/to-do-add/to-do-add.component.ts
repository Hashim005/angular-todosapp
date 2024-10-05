import { ToDo } from './../to-do';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-do-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './to-do-add.component.html',
  styleUrl: './to-do-add.component.css'
})
export class ToDoAddComponent implements OnInit {

  task:string = '';
  dueDate:string = '';
  toDoId:string | null = null;
  constructor(private toDoService:ToDoService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params['id']){
        this.toDoId = params['id'];
        this.loadToDoItem();
      }
    })
  }


  loadToDoItem(){
    this.toDoService.getToDoById(this.toDoId!).subscribe((toDo:ToDo)=>{
      this.task  = toDo.task;
      this.dueDate = toDo.dueDate

    });
  }

  addOrUpdateToDo(){
    const newToDo:ToDo = {
      task:this.task,
      dueDate:this.dueDate,
      completed:false,
      id:this.toDoId || undefined
    };
    if(this.toDoId){
      // Edit operation work
      this.toDoService.updateToDo(newToDo).subscribe(()=>{
        alert("updated task")
        this.router.navigate(['/home']).then(()=>{
          window.location.reload();
        })
      })

    }
    else{

      if(!this.task || !this.dueDate ){
        alert("Please Fill In This Field's");
        return
      }
      
      else{
        this.toDoService.addToDo(newToDo).subscribe(() =>{
          // console.log("add the task",result);
            this.router.navigate(['/home']).then(() => {
            window.location.reload(); // Ensure the page refreshes to fetch the latest data
          });
        })

      }

    }

  }
  cancel(){
    this.router.navigate(['/home']);
  }

}
