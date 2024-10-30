import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent
    },
    {
        path: "user/add",
        component: UserFormComponent
    },
    {
        path: "user/edit/:id",
        component: UserFormComponent
    }
];
