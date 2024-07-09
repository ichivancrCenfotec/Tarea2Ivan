import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProduct } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService <IProduct>{

  protected override source: string  ='products';
  private itemListSignal =  signal<IProduct[]>([]);
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
      console.log('error in getting all products request',error);
      this.snackBat.open('Error in getting products', 'close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  });
}

public save(item: IProduct){

  this.add(item).subscribe({

    next: (response: any) => {

      console.log('response',response);
        this.itemListSignal.update((products: IProduct[]) => [response, ...products]);
    },
    error: (error: any) => {
      console.log('error in saving products request',error.description);
      this.snackBat.open('Error in getting products', 'close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }

})
}

public update(item: IProduct){

  this.add(item).subscribe({

    next: (response: any) => {
      const updatedItems = this.itemListSignal().map(product => product.id === item.id ? item : product);

        this.itemListSignal.set(updatedItems);
    },
    error: (error: any) => {
      console.log('error in saving produc request',error.description);
      this.snackBat.open('Error in getting products', 'close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }

})
}

public delete(item: IProduct ){

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
