import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, } from '../models/user.model';
import { UserRoleService } from '../services/user-role.service';
import { Role } from '../models/role.model';
import { RolesService } from '../services/roles.service';
import { ConfirmationService } from '../services/confirmation.service';
import { UserRole } from '../models/user-role.model';
import { ErrorService } from '../services/error.service';
import { RolePermissionsComponent } from '../role-permissions/role-permissions.component';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css'],
})
export class UserRoleComponent implements OnInit {
  userRolesForm: FormGroup;
  newRoleName: string = '';
  roles: Role[] = [];

  @Input() userRoles: UserRole[] = [];
  @Input() userSelected!: User;

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private userRoleService: UserRoleService,
    private roleService: RolesService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService,
    private modalService: BsModalService,
  ) {
    this.userRolesForm = this.formBuilder.group({
      roles: [],
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

  removeRole(userRoleId: number): void {
    this.userRoleService.deleteUserRole(userRoleId).subscribe({
      next: () => {
        console.log('Role added successfully');
        this.showDialogOnConfermation(`delete role: ${userRoleId} correctly`);
        this.loadUserRoles();
      },
      error: (error: any) => {
        console.error('Error adding role to user:', error);
      },
    });

  }

  editRole(userRoleId: number): void {
    const modalOptions: ModalOptions = {
      class: 'modal-lg', 
    };
        const modalRef: BsModalRef = this.modalService.show(RolePermissionsComponent, modalOptions);
  }

  addNewRole(): void {
    const newRole: UserRole = {
      user: this.userSelected,
      role: { roleId: 0, roleName: this.newRoleName },
      userRoleId: 0
    };

    this.userRoleService.createUserRole(newRole).subscribe({
      next: () => {
        console.log('Role added successfully');
        this.showDialogOnConfermation(`added role: ${newRole.role.roleName} to user :  ${newRole.user.username} correctly`);
        this.loadUserRoles();
      },
      error: (error: any) => {
        console.error('Error adding user:', error);
        const errorMessage = error.error || 'Unknown error';
        this.showDialogOnError(`Failed to add role ${errorMessage}`);
      },
    });
    this.newRoleName = '';
  }

  loadUserRoles(): void {
    this.userRoleService.getUserRolesByUserId(this.userSelected.userId).subscribe({
      next: (userRoles: UserRole[]) => {
        this.userRoles = userRoles || [];
      },
      error: (error: any) => {
        console.error('Error adding user:', error);
        const errorMessage = error.error || 'Unknown error';
        this.showDialogOnError(`Failed to load user roles. Please try again ${errorMessage}`);
      },
    });
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (data: Role[]) => {
        this.roles = data;
      },
      error: (error: any) => {
        console.error('Error adding user:', error);
        const errorMessage = error.error || 'Unknown error';
        this.showDialogOnError(`Failed to load roles. Please try again ${errorMessage}`);
      },
    });
  }

  showDialogOnError(errorMessage: string): void {
    this.errorService.showError(errorMessage);
  }


  showDialogOnConfermation(confirmationMessage: string): void {
    this.confirmationService.showConfirmation(confirmationMessage);
  }
}
