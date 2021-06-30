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
  products: Product[];
  currentCategoryId: number;
  currentCategoryName: string;
  seacrhMode: boolean;

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

    //now search the product using keyword

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
      this.products = data;
      console.log(data);
    });
  }

  handleListProducts() {
    //check if  id  parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log(hasCategoryId);

    if (hasCategoryId) {
      //get the id param string. convert string to number " using +" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      console.log(this.currentCategoryId);

      //get the name param string.
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
      console.log(this.currentCategoryName);
    } else {
      //not category id is availbale  ... defaukr to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
        // console.log(data);
      });
  }
}
