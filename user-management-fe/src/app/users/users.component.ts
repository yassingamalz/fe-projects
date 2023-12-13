import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ErrorService } from '../services/error.service';
import { ConfirmationService } from '../services/confirmation.service';
import { UserRoleComponent } from '../user-role/user-role.component';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserRoleService } from '../services/user-role.service';
import { UserRole } from '../models/user-role.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  editingUser: User | null = null;
  userFormModel: User = { userId: 0, username: '', password: '', email: ''};

  constructor(
    private usersService: UsersService,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService,
    private modalService: BsModalService,
    private userRoleService: UserRoleService 
  ) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error: any) => {
        console.error('Error loading users:', error);
        const errorMessage = error.message || 'Unknown error';

        if (error.status === 0) {
          // Handle the case where the server is not reachable
          this.showDialogOnError('Failed to load users. The server is not reachable.');
        } else {
          this.showDialogOnError(`Failed to load users. Please try again ${errorMessage}`);
        }
      },
      complete: () => {
        console.log('Loading users complete.');
      },
    });
  }


  onSubmit(): void {
    if (this.editingUser) {
      // Update existing user
      this.usersService.updateUser(this.editingUser.userId, this.userFormModel).subscribe({
        next: (data: any) => {
          this.loadUsers();
          this.cancelEdit();
        },
        error: (error: any) => {
          console.error('Error updating user:', error);
          const errorMessage = error.message || 'Unknown error';
          this.showDialogOnError(`Failed to update user. Please try again ${errorMessage}`);

        },
        complete: () => {
          console.log('Update user complete.');
          this.showDialogOnConfermation(`user updated successfully`);
        },
      });
    } else {
      // Add new user
      this.usersService.createUser(this.userFormModel).subscribe({
        next: (data: any) => {
          this.loadUsers();
          this.userFormModel = { userId: 0, username: '', password: '', email: '' };
        },
        error: (error: any) => {

          console.error('Error adding user:', error);
          const errorMessage = error.error || 'Unknown error';
          this.showDialogOnError(`Failed to add user. Please try again ${errorMessage}`);
        },
        complete: () => {
          console.log('Add user complete.');
          this.showDialogOnConfermation(`user created successfully`);

        },
      });
    }
  }

  deleteUser(user: User): void {
    this.usersService.deleteUser(user.userId).subscribe({
      next: (data: any) => {
        this.loadUsers();
      },
      error: (error: any) => {
        console.error('Error deleting user:', error);
        const errorMessage = error.error || 'Unknown error';
        this.showDialogOnError(`Failed to delete user. Please try again ${errorMessage}`);
      },
      complete: () => {
        console.log(`Delete user ${user.username} complete.`);
        this.showDialogOnConfermation(`user ${user.username} deleted successfully`);
      },
    });
  }

  editUser(user: User): void {
    this.editingUser = user;
    this.userFormModel = { userId: user.userId, username: user.username, password: user.password, email: user.email };
  }

  cancelEdit(): void {
    this.editingUser = null;
    this.userFormModel = { userId: 0, username: '', password: '', email: '' };
  }

  manageUserRoles(user: User): void {
    const modalOptions: ModalOptions = {
      class: 'modal-lg', 
    };

    // Load user roles only when the button is clicked
    this.userRoleService.getUserRolesByUserId(user.userId).subscribe(
      (userRoles: UserRole[]) => {
        const modalRef: BsModalRef = this.modalService.show(UserRoleComponent, modalOptions);

        console.log("user is:",user)
        modalRef.content.userRoles = userRoles || [];
        modalRef.content.userSelected = user;

        modalRef.content.onClose.subscribe((result: { roles: any }) => {
          if (result) {
            // Update the user roles if needed
            this.updateUserRoles(user.userId, result.roles);
          }
        });
      },
      (error) => {
        console.error('Error loading user roles:', error);
        // Handle the error loading user roles
      }
    );
  }
  updateUserRoles(userId: number, roles: any) {
    throw new Error('Method not implemented.');
  }

  showDialogOnError(errorMessage: string): void {
    this.errorService.showError(errorMessage);
  }

  showDialogOnConfermation(confirmationMessage: string): void {
    this.confirmationService.showConfirmation(confirmationMessage);
  }
}