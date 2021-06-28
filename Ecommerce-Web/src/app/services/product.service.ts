import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id

  // const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
     const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient
      .get<GetResponce>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponce {
  _embedded: {
    products: Product[];
  };
}
