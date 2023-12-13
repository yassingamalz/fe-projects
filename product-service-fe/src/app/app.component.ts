import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-service-fe';

  isSidebarOpened = false;

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
    console.log('Sidebar is now opened:', this.isSidebarOpened);
    // Handle the isOpened state as needed
  }
}
