import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoaderComponent } from '../../loader/loader.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ICategory, IProduct } from '../../../interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    ModalComponent,
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {


  getCategoriId(){
    return this.product.category ? this.product.category.id || '' : '';
  }
  setCategoryId(value: string){
    if(this.product.category){
      this.product.category.id = Number(value);
    }else{
      this.product.category = {id: Number(value)} as ICategory;}
  
  }

 @Input () product: IProduct = {};
 @Input () action = '';
 @Output() callParentEvent : EventEmitter<IProduct> = new EventEmitter<IProduct>()
 callEvent(){
   this.callParentEvent.emit(this.product);
 }

}
