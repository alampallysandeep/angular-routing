import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink, ResolveFn, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit{
  userId = input.required<string>();
  message = input.required<string>();
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute) // with using of Observable
  userName = computed(()=>
    this.usersService.users.find((user)=> user.id == this.userId())?.name
  )
  userNameUsingresolveFn = signal<string>('')
  //userNamee:string = '';  // with using of Observable

  constructor(){
    // with using of Observable
    // this.activatedRoute.paramMap.subscribe({
    //   next:(paramMap)=> {
    //     this.userName = this.usersService.users.find((u)=> u.id === paramMap.get('userId'))?.name || ''
    //   }
    // })

    //using rxjs pipe and operators
    // this.activatedRoute.paramMap.pipe(
    //   map(params => params.get('userId')),
    //   filter((id) : id is string => !!id),
    //   map(id=>this.usersService.users.find((u)=>u.id === id)?.name ?? '')
    // ).subscribe(userNamee => {
    //   this.userNamee = userNamee
    //   console.log(this.userNamee)
    // })
  }

  ngOnInit(): void {
    console.log(this.message())
    this.userNameUsingresolveFn.set(this.activatedRoute.snapshot.data['userName1'])
  }
  
}

export const userNameResolveFn:ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot
) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u)=> u.id === activatedRoute.paramMap.get('userId'))?.name || ''
  return userName
}

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
)=>{
  return userNameResolveFn(activatedRoute,routerState) +  '\'s Tasks'
}