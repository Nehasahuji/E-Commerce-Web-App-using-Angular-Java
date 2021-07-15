import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  // crated checkout form group
  checkoutFormGroup: FormGroup;

  totalPrice: number;
  totalQuantity: number;

  //array for credit card years

  creditCardYear: number[] = [];

  //array for credit card month
  creditCardMonth: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  // inject form builder
  constructor(
    private formBuilder: FormBuilder,
    private shopformservice: ShopFormService
  ) {}

  ngOnInit(): void {
    // created afrom group
    this.checkoutFormGroup = this.formBuilder.group({
      // created a customer group
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithWhitespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWithWhitespace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
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

    // populate the credit card month

    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth ' + startMonth);

    this.shopformservice.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrive credit card month :' + JSON.stringify(data));
      this.creditCardMonth = data;
    });

    //populate the credit card year

    this.shopformservice.getCreditCardYears().subscribe((data) => {
      console.log('Retrive credit card yeard :' + JSON.stringify(data));
      this.creditCardYear = data;
    });

    ///populate the countriees

    this.shopformservice.getCountries().subscribe((data) => {
      console.log('Retrive Countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }

  //add getter methord

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  //for last name
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  // for email
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );

      //bug Fix for states

      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log('handling the submit button');

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log(
      'the email address is ' +
        this.checkoutFormGroup.get('customer')!.value.email
    );

    console.log(
      'the shipping address country is ' +
        this.checkoutFormGroup.get('ShippingAddress')!.value.country.name
    );

    console.log(
      'the shipping address sate is ' +
        this.checkoutFormGroup.get('ShippingAddress')!.value.state.name
    );
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYEar: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    //if the current year equals the selected year,then start with the current month

    let startMonth: number;

    if (currentYear === selectedYEar) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.shopformservice.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('retrive credit card months ' + JSON.stringify(data));
      this.creditCardMonth = data;
    });
  }

  getStates(formGroupName: string) {
    const FormGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = FormGroup?.value.country.code;
    const countryName = FormGroup?.value.country.name;

    console.log(`${formGroupName} country code : ${countryCode} `);
    console.log(`${formGroupName} country Name : ${countryName} `);

    this.shopformservice.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      //select the first item by default

      FormGroup?.get('state')?.setValue(data[0]);
    });
  }
}
