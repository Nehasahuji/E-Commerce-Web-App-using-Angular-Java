import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {
  constructor() {}

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    //build an array for Month dropdown list
    //- start at current month and loop until

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    ///of operator from rxjs will wrap an object as an observable

    return of(data);
  }



  getCreditCardYears():Observable<number[]>{
    let data:number[] = [];

     //build an array for year dropdown list
    //- start at current month and loop until


   const startYear : number = new Date().getFullYear();
   const endYear : number = startYear+10;


    for(let theyear = startYear; theyear<=endYear ;theyear++){
      data.push(theyear);
    }
       
    //wrap the of operator to get the data
    return of(data);

  }
}
