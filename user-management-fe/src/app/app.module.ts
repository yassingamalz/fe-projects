import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PermissionsComponent,
    RolesComponent,
    UsersComponent,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    NavbarComponent,
    UserRoleComponent,
    RolePermissionsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,  
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
