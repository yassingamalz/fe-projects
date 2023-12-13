import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      nav {
        display: flex;
        justify-content: space-around;
        background: #eee;
        padding: 10px;
      }
    `,
  ],
})
export class AppComponent {

title : String = "user-management-fe";

}