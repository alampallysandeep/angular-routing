import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { userNameResolveFn, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/users.routes"

export const routes: Routes = [
    {
        path:'',
        component:NoTaskComponent,
        title:'No task selected'
    },
    {
        path: 'users/:userId', //<your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes,
        data: {
            message: 'accessed message from the static data defined in routes'
        },
        resolve: {
            userName1: userNameResolveFn
        }
    },
    {
        path:'**',
        component:NotFoundComponent
    }
]