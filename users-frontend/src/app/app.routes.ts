// export const routes: Routes = [];
import { Routes } from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailsComponent} from './user-details/user-details.component';

export const routes: Routes = [
  { path: '', component: UserListComponent }, // Default route
  { path: 'users/:id', component: UserDetailsComponent }, // User details route
];