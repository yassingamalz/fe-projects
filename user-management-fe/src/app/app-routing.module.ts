import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'roles', component: RolesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
