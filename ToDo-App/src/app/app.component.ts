import { ToDoService } from './to-do.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoAddComponent } from './to-do-add/to-do-add.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ToDo } from './to-do';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToDoAddComponent,TodoListComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDo-App';
  currentPage:string = 'home';

  constructor(private toDoService:ToDoService){}



}
