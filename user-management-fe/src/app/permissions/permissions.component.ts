import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../services/permissions.service';
import { ErrorService } from '../services/error.service';
import { ConfirmationService } from '../services/confirmation.service';
import { Permission } from '../models/permissions.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {
  permissions: Permission[] = [];
  editingPermission: Permission | null = null;
  permissionFormModel: Permission = {
    permissionId: 0,
    permissionName: '',
  };

  constructor(
    private permissionService: PermissionService,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
  }

 
  loadPermissions(): void {
    this.permissionService.getAllPermissions().subscribe({
      next: (data: Permission[]) => {
        this.permissions = data;
      },
      error: (error: any) => {
        console.error('Error loading permissions:', error);
        const errorMessage = error.message || 'Unknown error';

        if (error.status === 0) {
          // Handle the case where the server is not reachable
          this.showDialogOnError('Failed to load permissions. The server is not reachable.');
        } else {
          this.showDialogOnError(`Failed to load permissions. Please try again ${errorMessage}`);
        }
      },
      complete: () => {
        console.log('Loading permissions complete.');
      },
    });
  }

  onSubmit(): void {
    if (this.editingPermission) {
      // Update existing permission
      this.permissionService.updatePermission(this.editingPermission.permissionId, this.permissionFormModel).subscribe({
        next: (data: any) => {
          this.loadPermissions();
          this.cancelEdit();
        },
        error: (error: any) => {
          console.error('Error updating permission:', error);
          const errorMessage = error.message || 'Unknown error';
          this.showDialogOnError(`Failed to update permission. Please try again ${errorMessage}`);
        },
        complete: () => {
          console.log('Update permission complete.');
          this.showDialogOnConfirmation(`Permission updated successfully`);
        },
      });
    } else {
      // Add new permission
      this.permissionService.createPermission(this.permissionFormModel).subscribe({
        next: (data: any) => {
          this.loadPermissions();
          this.permissionFormModel = { permissionId: 0, permissionName: '' };
        },
        error: (error: any) => {
          console.error('Error adding permission:', error);
          const errorMessage = error.message || 'Unknown error';
          this.showDialogOnError(`Failed to add permission. Please try again ${errorMessage}`);
        },
        complete: () => {
          console.log('Add permission complete.');
          this.showDialogOnConfirmation(`Permission created successfully`);
        },
      });
    }
  }

  deletePermission(permission: Permission): void {
    this.permissionService.deletePermission(permission.permissionId).subscribe({
      next: (data: any) => {
        this.loadPermissions();
      },
      error: (error: any) => {
        console.error('Error deleting permission:', error);
        const errorMessage = error.message || 'Unknown error';
        this.showDialogOnError(`Failed to delete permission. Please try again ${errorMessage}`);
      },
      complete: () => {
        console.log(`Delete permission ${permission.permissionName} complete.`);
        this.showDialogOnConfirmation(`Permission ${permission.permissionName} deleted successfully`);
      },
    });
  }

  editPermission(permission: Permission): void {
    this.editingPermission = permission;
    this.permissionFormModel = { ...permission };
  }

  cancelEdit(): void {
    this.editingPermission = null;
    this.permissionFormModel = { permissionId: 0, permissionName: '' };
  }

  showDialogOnError(errorMessage: string): void {
    this.errorService.showError(errorMessage);
  }

  showDialogOnConfirmation(confirmationMessage: string): void {
    this.confirmationService.showConfirmation(confirmationMessage);
  }
}
