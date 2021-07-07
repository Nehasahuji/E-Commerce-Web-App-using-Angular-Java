import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  seacrhMode: boolean = false;

  //the property for pagionation
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.seacrhMode = this.route.snapshot.paramMap.has('keyword');
    if (this.seacrhMode) {
      this.handelSearchProducts();
      console.log('inside search mode');
    } else {
      this.handleListProducts();
    }
  }

  handelSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    //if we have different keyword than previous
    //then set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword},thePageNumber=${this.thePageNumber}`);

    //now search the product using keyword

    this.productService
      .SearchProductPagination(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }

  handleListProducts() {
    //check if  id  parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log(hasCategoryId);

    if (hasCategoryId) {
      //get the id param string. convert string to number " using +" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      console.log(this.currentCategoryId);
    } else {
      //not category id is availbale  ... defaukr to category id 1
      this.currentCategoryId = 1;
    }

    //  check if we have a different category than previous
    //  Note:angular will reuse a component if it is currently beign viewed

    // if we have a different category id then previous
    //thesn set the pageNumber  back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(
      `currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}`
    );

    this.productService
      .getProductListPagination(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

// Add to cart method
  addToCart(theProduct : Product){
    console.log(`adding to cart : ${theProduct.name},${theProduct.unitPrice}`);
    

    // some task to do here
  }
}
