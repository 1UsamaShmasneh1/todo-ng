import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task{
  name:string;
  isUpdated:boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:Task[]=[];

  constructor() { }
  handleSubmit(addForm:NgForm){
    let newTask:Task = {
      name: addForm.value.task, 
      isUpdated: false
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

  ngOnInit(): void {
  }

}
