import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = localStorage;
  constructor() {
    //read the data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;

      //compute total based on the data that is read from storage

      this.computeCartTotal();
    }
  }

  addToCart(theCartItem: CartItem) {
    //check if we alreay have iteem in cart
    let alreayExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    // find the item in the cart on item id
    if (this.cartItems.length > 0) {
      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id == theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }

      //refractor above commented code using the array.find method

      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      )!;

      //check if we found it

      alreayExistsInCart = existingCartItem != undefined;
    }

    if (alreayExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    //compute the cart total price and total quantity
    this.computeCartTotal();
  }
  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values  .. all subscriber will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging

    this.logCartData(totalPriceValue, totalQuantityValue);



    //persist cart data
    this.persistCartItems();
  }


// persist cart items method

persistCartItems(){
  this.storage.setItem('cartItems',JSON.stringify(this.cartItems)); 
}


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of log cart');

    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name : ${tempCartItem.name} , quantity=${tempCartItem.quantity} , unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice : ${totalPriceValue.toFixed(
        2
      )}, totalQuantity : ${totalQuantityValue}`
    );
    console.log('------------------------------------------');
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotal();
    }
  }
  remove(theCartItem: CartItem) {
    // get index of the intem in array

    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );

    //if found remove the item from the array
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotal();
    }
  }
}
