import { Component, OnInit } from '@angular/core';
import { RolesService } from '../services/roles.service';
import { Role } from '../models/role.model';
import { ErrorService } from '../services/error.service';
import { ConfirmationService } from '../services/confirmation.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  editingRole: Role | null = null;
  roleFormModel: Role = { roleId: 0, roleName: '' };

  constructor(
    private rolesService: RolesService,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.rolesService.getAllRoles().subscribe({
      next: (data: Role[]) => {
        this.roles = data;
      },
      error: (error: any) => {
        console.error('Error loading roles:', error);
        const errorMessage = error.message || 'Unknown error';

        if (error.status === 0) {
          // Handle the case where the server is not reachable
          this.showDialogOnError('Failed to load roles. The server is not reachable.');
        } else {
          this.showDialogOnError(`Failed to load roles. Please try again ${errorMessage}`);
        }
      },
      complete: () => {
        console.log('Loading roles complete.');
      },
    });
  }

  onSubmit(): void {
    if (this.editingRole) {
      // Update existing role
      this.rolesService.updateRole(this.editingRole.roleId, this.roleFormModel).subscribe({
        next: (data: any) => {
          this.loadRoles();
          this.cancelEdit();
        },
        error: (error: any) => {
          console.error('Error updating role:', error);
          const errorMessage = error.message || 'Unknown error';
          this.showDialogOnError(`Failed to update role. Please try again ${errorMessage}`);
        },
        complete: () => {
          console.log('Update role complete.');
          this.showDialogOnConfirmation(`Role updated successfully`);
        },
      });
    } else {
      // Add new role
      this.rolesService.createRole(this.roleFormModel).subscribe({
        next: (data: any) => {
          this.loadRoles();
          this.roleFormModel = { roleId: 0, roleName: '' };
        },
        error: (error: any) => {
          console.error('Error adding role:', error);
          const errorMessage = error.error || 'Unknown error';
          this.showDialogOnError(`Failed to add role. Please try again ${errorMessage}`);
        },
        complete: () => {
          console.log('Add role complete.');
          this.showDialogOnConfirmation(`Role created successfully`);
        },
      });
    }
  }

  deleteRole(role: Role): void {
    this.rolesService.deleteRole(role.roleId).subscribe({
      next: (data: any) => {
        this.loadRoles();
      },
      error: (error: any) => {
        console.error('Error deleting role:', error);
        const errorMessage = error.error || 'Unknown error';
        this.showDialogOnError(`Failed to delete role. Please try again ${errorMessage}`);
      },
      complete: () => {
        console.log(`Delete role ${role.roleName} complete.`);
        this.showDialogOnConfirmation(`Role ${role.roleName} deleted successfully`);
      },
    });
  }

  editRole(role: Role): void {
    this.editingRole = role;
    this.roleFormModel = { roleId: role.roleId, roleName: role.roleName };
  }

  cancelEdit(): void {
    this.editingRole = null;
    this.roleFormModel = { roleId: 0, roleName: '' };
  }

  showDialogOnError(errorMessage: string): void {
    this.errorService.showError(errorMessage);
  }

  showDialogOnConfirmation(confirmationMessage: string): void {
    this.confirmationService.showConfirmation(confirmationMessage);
  }
}
