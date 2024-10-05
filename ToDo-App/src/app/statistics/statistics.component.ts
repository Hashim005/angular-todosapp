import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { ToDo } from '../to-do';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {

  totalTask:number = 0;
  completeTask:number = 0;
  pendingTask:number = 0;
  circleBackgroundStyle:string = '';


  constructor(private todoService:ToDoService){

  }
  ngOnInit(): void {
    this.getTaskStatistics();
  }


  getTaskStatistics():void{
    this.todoService.getToDoList().subscribe(result =>{
      this.totalTask = result.length;
      this.completeTask = result.filter(todo => todo.completed).length;
      this.pendingTask = this.totalTask - this.completeTask
      this.updateCircleBackground();
    })

  }

  updateCircleBackground():void{
    const completedPercent = (this.totalTask === 0) ? 0 : (this.completeTask / this.totalTask)*100 || 0;
    const pendingPercent = (this.totalTask === 0) ? 0 : (this.pendingTask / this.completeTask)*100 || 0;
    this.circleBackgroundStyle = `
      conic-gradient(
        #28a745 0% ${completedPercent}%,    /* Completed Tasks */
        #dc3545 ${completedPercent}% ${completedPercent + pendingPercent}%, /* Pending Tasks */
        #6c757d ${completedPercent + pendingPercent}% 100% /* Remaining Tasks */
      )
    `;
  }



}
