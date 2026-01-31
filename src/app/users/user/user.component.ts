import { Component, computed, inject, input } from '@angular/core';

import { type User } from './user.model';
import { RouterLink, RouterLinkActive } from "@angular/router";
//import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [RouterLink, RouterLinkActive],
})
export class UserComponent {
  //private router = inject(Router)
  user = input.required<User>();

  imagePath = computed(() => 'users/' + this.user().avatar);

  // selectUser(){
  //   this.router.navigate(['/tasks'])
  // }
}
