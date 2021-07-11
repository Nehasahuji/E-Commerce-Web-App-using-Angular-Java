import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  // crated checkout form group
  checkoutFormGroup: FormGroup;

  totalPrice:number;
  totalQuantity:number;

  // inject form builder
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // created afrom group
    this.checkoutFormGroup = this.formBuilder.group({
      // created a customer group
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),

      // for shipping address
      shippingAddress: this.formBuilder.group({
        street: [],
        city: [''],
        state: [''],
        country: [''],
        zipcode: [''],
      }),

      // Billing Address
      billingAddress: this.formBuilder.group({
        street: [],
        city: [''],
        state: [''],
        country: [''],
        zipcode: [''],
      }),

      ///credit card Information

      creditCard: this.formBuilder.group({
        cardType: [],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit() {
    console.log('handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log(
      'the email address is ' +
        this.checkoutFormGroup.get('customer')!.value.email
    );
  }
}
