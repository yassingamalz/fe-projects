import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDTO } from 'src/app/models/product.dto';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

  export class ProductEditComponent {
    @Input() product: ProductDTO = {} as ProductDTO;
    
    constructor(public activeModal: NgbActiveModal) { }

    close(): void {
        this.activeModal.close();
    }      

    saveChanges() {
      this.activeModal.close(this.product);
    }
  }