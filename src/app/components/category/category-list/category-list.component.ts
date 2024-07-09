import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ICategory } from '../../../interfaces';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule, 
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

  @Input() itemList: ICategory[] = [];
  public selectedItem: ICategory = {};
  public categoryService: CategoryService = inject(CategoryService);

  @Input() areActionsAvailable: boolean = false;
  

  showDetailModal(item: ICategory, modal :any){

      this.selectedItem= {... item}
      modal.show();

  }

    handleFormAction(item : ICategory){
      this.categoryService.update(item);
    }


    deleteItem(item: ICategory){
      this.categoryService.delete(item);
    }

}
