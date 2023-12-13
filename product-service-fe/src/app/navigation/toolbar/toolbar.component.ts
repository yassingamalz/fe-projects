import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  logout() {
    // Implement logout functionality here
    console.log('Logging out...');
  }

  openSettings() {
    // Implement settings functionality here
    console.log('Opening settings...');
  }

}