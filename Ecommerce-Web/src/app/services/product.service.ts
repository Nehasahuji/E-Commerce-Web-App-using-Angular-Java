import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.ecommerceAppUrl + '/products';
  private categoryUrl = environment.ecommerceAppUrl + '/product_category';

  constructor(private httpClient: HttpClient) {}

  // used for pagination

  getProductListPagination(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponceProduct> {
    // need to build URL based on category id page and size
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    console.log(`getting products from -${searchUrl}`);

    return this.httpClient.get<GetResponceProduct>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponceProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    //need to build url based on keyword
    console.log(theKeyword);

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  // using pagination for search keyword

  SearchProductPagination(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponceProduct> {
    // need to build URL based on keyword page and size
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponceProduct>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<any[]> {
    return this.httpClient
      .get<GetResponceProduct>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponceProduct {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponceProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
