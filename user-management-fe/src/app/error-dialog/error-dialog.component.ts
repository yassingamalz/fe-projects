import { Component, ElementRef, Renderer2, ViewChild, ChangeDetectorRef, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})

export class ErrorDialogComponent implements AfterViewInit,OnDestroy {
 
  errorMessage = '';
  private subscription: Subscription = new Subscription;

  @ViewChild('errorDialog') errorDialog!: ElementRef;
  constructor(
    private errorService: ErrorService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }
 
  ngAfterViewInit(): void {
    this.subscription = this.errorService.error$.subscribe((message) => {
      console.log(message);
      this.errorMessage = message;
      this.showDialog();
    })
  }

  ngOnDestroy(): void {
    console.log("destroyed");
    this.subscription.unsubscribe();
  }

  showDialog(): void {
      this.errorDialog.nativeElement.classList.add('show');
      this.cdr.detectChanges(); 
  }

  clearError(): void {
    this.errorMessage = '';
    this.errorService.clearError();
    this.hideDialog();
  }

  hideDialog(): void {
    if (this.errorDialog.nativeElement) {
      this.renderer.removeClass(this.errorDialog.nativeElement, 'show');
      this.renderer.setStyle(this.errorDialog.nativeElement, 'display', 'none');
    }
  }
}
