import { Component, Input } from '@angular/core';
import { ProductDTO } from '../../models/product.dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
 @Input() product: ProductDTO = {} as ProductDTO;

  constructor(private modalService: NgbModal, private productService: ProductService) {}

  deleteProduct(product: ProductDTO) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      console.log("Product deleted:", product.name);
      // You may want to emit an event to notify the parent component to refresh the product list.
    });
  }

  editProduct(product: ProductDTO) {
    const modalRef = this.modalService.open(ProductEditComponent);
    modalRef.componentInstance.product = { ...product }; // Passing a copy to avoid modifying the original object
    modalRef.result.then((result) => {
      if (result) {
        console.log("Product updated:", result);
        // You may want to emit an event to notify the parent component to refresh the product list.
      }
    });
  }
}