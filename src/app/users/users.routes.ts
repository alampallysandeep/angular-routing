import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { leaveNewtaskPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { inject } from "@angular/core";
import { resolveTitle } from "./user-tasks/user-tasks.component";

const dummyCanMatch: CanMatchFn = (route,segments) => {
    const router = inject(Router);
    const shouldMatchSuccess = Math.random();
    if(shouldMatchSuccess){
        return true
    }
    return new RedirectCommand(router.parseUrl('/unothorized'));
}

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks', //<your-domain>/users/<uid>/tasks
        component: TasksComponent,
        runGuardsAndResolvers:"always",
        canMatch:[dummyCanMatch],
        resolve: {
            userTasks:resolveUserTasks
        },
        title:resolveTitle
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate:[leaveNewtaskPage]
    }
]