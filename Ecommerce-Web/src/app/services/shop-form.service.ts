import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {



  private countriesUrl='http://localhost:8080/api/countries';
  private statesUrl='http://localhost:8080/api/states';

  //Inject http client
  constructor( private httpClient : HttpClient) {}


  //get Countries

  getCountries(): Observable<Country[]>{

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }


  // get states api

  getStates(theCountryCode : string): Observable<State[]>{
     const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
     
     return this.httpClient.get<GetResponsStates>(searchStateUrl).pipe(
       map(response => response._embedded.states)
     );
    }


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


interface GetResponseCountries{
  _embedded : {
    countries : Country[];
  }
}

interface GetResponsStates{
  _embedded : {
    states : State[];
  }
}