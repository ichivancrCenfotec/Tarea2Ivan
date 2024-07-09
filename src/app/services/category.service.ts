import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategory } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService <ICategory> {

  protected override source: string  ='categories';
  private itemListSignal =  signal<ICategory[]>([]);
  private snackBat : MatSnackBar = inject(MatSnackBar);

  get item$ (){
    return this.itemListSignal;
  }

  public getAll(){
    this.findAll().subscribe({

      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response)    
    }, 
    error: (error: any) => {
      console.log('error in getting all categories request',error);
      this.snackBat.open('Error in getting categories', 'close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  });
}

public save(item: ICategory){

  this.add(item).subscribe({

    next: (response: any) => {

      console.log('response',response);
        this.itemListSignal.update((categories: ICategory[]) => [response, ...categories]);
    },
    error: (error: any) => {
      console.log('error in saving categories request',error.description);
      this.snackBat.open('Error in getting categories', 'close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }

})
}

public update(item: ICategory){

  this.add(item).subscribe({

    next: (response: any) => {
      const updatedItems = this.itemListSignal().map(category => category.id === item.id ? item : category);

        this.itemListSignal.set(updatedItems);
    },
    error: (error: any) => {
      console.log('error in saving game request',error.description);
      this.snackBat.open('Error in getting categories', 'close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }

})
}

public delete(item: ICategory){

  this.del(item.id).subscribe({

    next: () => {
      const updatedItems = this.itemListSignal().filter(category => category.id != item.id  );

        this.itemListSignal.set(updatedItems);
    },
    error: (error: any) => {
      console.log('reponse',error.description);
      this.snackBat.open('Error in getting categories', 'close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }

})
}


}
