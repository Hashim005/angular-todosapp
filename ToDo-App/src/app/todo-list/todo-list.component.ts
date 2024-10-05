import { ToDoService } from './../to-do.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDo } from '../to-do';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit  {
  currentDate:Date = new Date();
  toDos:ToDo[] = [];
  filteredToDos: ToDo[] = [];
  todayPriorityTask : ToDo[] = [];
 @Output() getToDoEvent = new EventEmitter<ToDo>();

  constructor(private toDoService:ToDoService,private router:Router){
    this.getToDoList();
  }
  ngOnInit(): void {
    setTimeout(()=>{
      this.filterTodayPriorityTask();

    },2000);
  }


  getToDoList(){
    this.toDoService.getToDoList().subscribe(result =>{
      // console.log("result",result);
      this.toDos = result.map(todo =>({...todo,showDropdown:false}));
      this.filteredToDos = this.toDos;;

      // console.log("toDos after assignment:", this.toDos);
      // console.log("filteredToDos after assignment:", this.filteredToDos);

      this.getToDoEvent.emit();

    });

  }

  markAsCompleted(toDo:ToDo){
    toDo.completed = !toDo.completed;
    this.toDoService.updateToDo(toDo).subscribe(() => {
      this.getToDoList();
    })

  }
  deleteToDoItem(toDoItemId:string | undefined){
    this.toDoService.deleteToDo(toDoItemId).subscribe((result) =>{
      alert("list Item Deleted");
      this.getToDoList();
    })
  }

  editToDoItem(todoItemId:string | undefined){
    this.router.navigate(['/home/toDoAdd',todoItemId]);

  }

  filterTasks(status: string, event: Event) {
    event.preventDefault(); // Prevent default link behavior
    // console.log("Filtering tasks with status:", status);
    if (status === 'all') {
      this.filteredToDos = this.toDos;
    } else if (status === 'pending') {
      this.filteredToDos = this.toDos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      this.filteredToDos = this.toDos.filter(todo => todo.completed);
    }
    // console.log("filteredToDos after filtering:", this.filteredToDos);
  }

  filterTodayPriorityTask(){
    // time formate
    const today = new Date().toISOString().split('T')[0];

    //today priority operation
    this.todayPriorityTask = this.toDos.filter(todo => todo.dueDate === today && !todo.completed);
    console.log("today priority task",this.todayPriorityTask);

  }

  closePriorityTask(){
    this.todayPriorityTask = [];

  }

  onFilterChange(event:Event){
    const filter = (event.target as HTMLSelectElement).value
    const today = new Date();
    switch(filter){
      case 'today':
        this.filteredToDos = this.toDos.filter(todo => this.isSameDay(new Date(todo.dueDate),today));
        break;
      case 'week':
        this.filteredToDos = this.toDos.filter(todo => this.isSameWeek(new Date(todo.dueDate),today));
        break;
      case 'month':
        this.filteredToDos = this.toDos.filter(todo => this.isSameMonth(new Date(todo.dueDate),today));
        break;
      default:
        this.filteredToDos = this.toDos;
        break;
    }
  }

  isSameDay(date1:Date, date2:Date):boolean{
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()

  }

  isSameWeek(date1:Date,date2:Date):boolean{
    const firstDayOfWeek = this.getFirstDayOfWeak(date2);
    const lastDayOfWeek = this.getLastDayOfWeak(date2);
    return date1 >= firstDayOfWeek && date1 <= lastDayOfWeek
  }

  getFirstDayOfWeak(date:Date):Date{
    const day = date.getDay();
    const diff = date.getDate()- day+(day === 0 ? -6 : 1)
    return new Date(date.setDate(diff));

  }
  getLastDayOfWeak(date:Date):Date{
    const firstDayOfWeek = this.getFirstDayOfWeak(date);
    return new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 6))

  }

  isSameMonth(date1:Date,date2:Date){
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
  }


  cloneTodoItem(toDo:ToDo):void{
    const cloneTodo = {
      ...toDo, // all properties from existing ToDo
      id:undefined,
      dueDate:new Date(toDo.dueDate).toISOString().split('T')[0],
      showDropDown:false
    };
    this.toDoService.addToDo(cloneTodo).subscribe(todo =>{
      this.getToDoList();
    });


  }

  toggleDropdown(toDo: ToDo) {
    toDo.showDropdown = !toDo.showDropdown;
  }


}



