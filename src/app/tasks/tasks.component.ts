import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink } from "@angular/router";
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit{
  userId = input.required<string>()
  //order = input<'asc' | 'desc'>()
  order = signal<'asc'|'desc'>('asc'); 
  private tasksService = inject(TasksService)
  private destrouRef = inject(DestroyRef)
  // userTasks = computed(()=>{
  //   return this.tasksService.allTasks().filter((task) => task.userId === this.userId()).sort((a, b)=>{
  //     if(this.order() == 'desc'){
  //       return a.id > b.id ? -1 : 1;
  //     }else{
  //       return a.id > b.id ? 1 : -1
  //     }
  //   })
  // });
  userTasks = input.required<Task[]>() // using resolver function
  private activatedRoute = inject(ActivatedRoute)
  constructor(){
    const subscription = this.activatedRoute.queryParams.subscribe({
      next:(params)=> {if(Object.keys(params).length) {this.order.set(params['order'])}}
    })
    this.destrouRef.onDestroy(()=>{
      subscription.unsubscribe()
    })
  }
  ngOnInit(): void {
    
  }
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRoute:ActivatedRouteSnapshot,
) => {
  const tasksService = inject(TasksService);
  const order = activatedRoute.queryParams['order'];
  const allTasks = tasksService.allTasks().filter(item => item.userId === activatedRoute.paramMap.get('userId')).sort((a,b)=>{
    if(order && order == 'desc'){
      return a.id > b.id ? -1 : 1
    }else{
      return a.id > b.id ? 1 : -1
    }
  })
  return allTasks.length ? allTasks : []
}