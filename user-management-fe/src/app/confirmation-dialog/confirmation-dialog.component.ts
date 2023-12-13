import { Component, ElementRef, Renderer2, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from '../services/confirmation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements AfterViewInit, OnDestroy {
  confirmationMessage = '';
  private subscription: Subscription = new Subscription();

  @ViewChild('confirmationDialog') confirmationDialog!: ElementRef;

  constructor(
    private confirmationService: ConfirmationService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.subscription = this.confirmationService.confirmation$.subscribe((message) => {
      console.log(message);
      this.confirmationMessage = message;
      this.showDialog();
    });
  }

  ngOnDestroy(): void {
    console.log('destroyed');
    this.subscription.unsubscribe();
  }

  showDialog(): void {
    this.confirmationDialog.nativeElement.classList.add('show');
    this.cdr.detectChanges();
  }

  clearConfirmation(): void {
    this.confirmationMessage = '';
    this.confirmationService.clearConfirmation();
    this.hideDialog();
  }

  hideDialog(): void {
    if (this.confirmationDialog.nativeElement) {
      this.renderer.removeClass(this.confirmationDialog.nativeElement, 'show');
      this.renderer.setStyle(this.confirmationDialog.nativeElement, 'display', 'none');
    }
  }
}