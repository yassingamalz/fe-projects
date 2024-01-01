import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { InvestmentCalculatorComponent } from './investment-calculator/investment-calculator.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    IntroductionComponent,
    InvestmentCalculatorComponent,
    SlideshowComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
