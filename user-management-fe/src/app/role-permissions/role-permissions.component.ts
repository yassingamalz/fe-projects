import { Component, Input, OnInit } from '@angular/core';
import { Permission } from '../models/permissions.model';
import { ConfirmationService } from '../services/confirmation.service';
import { ErrorService } from '../services/error.service';
import { PermissionService } from '../services/permissions.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role-permissions',
  templateUrl: './role-permissions.component.html',
  styleUrls: ['./role-permissions.component.css']
})
export class RolePermissionsComponent implements OnInit {

  permissions: Permission[] = [];

  constructor(
    private permissionService: PermissionService,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService,
    private bsModalRef: BsModalRef,
  ) { }


  ngOnInit(): void {
    this.loadPermissions();
  }

   
  onClose(): void {
    this.bsModalRef.hide();
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


  selectedPermissions: Permission[] = [];

  isPermissionSelected(permission: Permission): boolean {
    return this.selectedPermissions.includes(permission);
  }

  togglePermission(permission: Permission): void {
    if (this.isPermissionSelected(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  }

  showDialogOnError(errorMessage: string): void {
    this.errorService.showError(errorMessage);
  }

  showDialogOnConfirmation(confirmationMessage: string): void {
    this.confirmationService.showConfirmation(confirmationMessage);
  }
}
