import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { ToDoAddComponent } from '../to-do-add/to-do-add.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ToDoAddComponent,TodoListComponent,RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentPage:string = '';

  sidebarVisible = false;


  constructor(private router:Router, private toDoService:ToDoService){}
  navigateToAddPage() {
    this.router.navigate(['home/toDoAdd']);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  addToDos(){
    this.toDoService.getToDoList()

  }



}
