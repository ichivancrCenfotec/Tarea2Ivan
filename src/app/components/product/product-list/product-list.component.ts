import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { IProduct } from '../../../interfaces';
import { ProductService } from '../../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [

    CommonModule, 
    ModalComponent,
    ProductFormComponent

  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  @Input() itemList: IProduct[] = [];
  public selectedItem: IProduct = {};
  public gameService: ProductService = inject(ProductService);

  @Input() areActionsAvailable: boolean = false;
  

  showDetailModal(item: IProduct, modal :any){

      this.selectedItem= {... item}
      modal.show();

  }

    handleFormAction(item : IProduct){
      this.gameService.update(item);
    }


    deleteItem(item: IProduct){
      this.gameService.delete(item);
    }

}
