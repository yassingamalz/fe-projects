import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
  { path: 'roles', component: RolesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }, // Redirect to UsersComponent by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
