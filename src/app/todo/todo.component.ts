import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task{
  name:string;
  isUpdated:boolean;
  isVisible:boolean
}

enum SortOption{
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:Task[]=[];
  readonly TASKS_KEY = 'tasks';

  SortEnum = SortOption;
  sort:SortOption = SortOption.NONE;

  constructor() { }
  handleSubmit(addForm:NgForm){
    let newTask:Task = {
      name: addForm.value.task, 
      isUpdated: false,
      isVisible: true
    }
    this.tasks.push(newTask);
    addForm.resetForm();
  }

  handleUpdate(t:Task){
    t.isUpdated = true;
  }

  handleFinishUpdate(oldName:string,newTaskName:string){
    let updatedTask:Task = 
        this.tasks.filter((t) => t.name === oldName)[0];
    updatedTask.name = newTaskName;
    updatedTask.isUpdated = false;
  }

  handleRemove(t:string){
    this.tasks = this.tasks.filter((task:Task) => task.name != t);
  }

  handleSort(sortDirection:SortOption){
    
    if(sortDirection === this.sort){
      this.sort = SortOption.NONE;
      return;
    }
    
    this.sort = sortDirection;
    
    switch (sortDirection) {
      case SortOption.ASC:
        this.tasks = this.tasks.sort((a,b) => {
          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();

          if(aLower < bLower){
            return -1;
          }
          if(aLower > bLower){
            return 1;
          }
          return 0;
        })
        break;

      case SortOption.DESC:
        this.tasks = this.tasks.sort((a,b) => {
          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();

          if(aLower > bLower){
            return -1;
          }
          if(aLower < bLower){
            return 1;
          }
          return 0;
        })
        break;

      case SortOption.NONE:
    
        break;
    
      default:
        break;
    }
  }

  handleSearch(v:string){
    this.tasks.map((task) => {
      task.isVisible = (task.name.includes(v));
    })
  }

  handleSave():void{
    localStorage.setItem(this.TASKS_KEY,JSON.stringify(this.tasks));
  }

  ngOnInit(): void {
    let savedTasksJson = localStorage.getItem(this.TASKS_KEY);
    if(savedTasksJson != null){
      this.tasks = JSON.parse(savedTasksJson);
    }
  }

}
