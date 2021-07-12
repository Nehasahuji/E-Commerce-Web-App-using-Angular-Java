import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';

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


  //array for credit card years

   creditCardYear : number[] = [];

  //array for credit card month
  creditCardMonth : number[] = [];

  // inject form builder
  constructor(private formBuilder: FormBuilder ,private shopformservice : ShopFormService ) {}

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



    // populate the credit card month


      const startMonth:number = new Date().getMonth()+1;
      console.log("startMonth " +startMonth);

      this.shopformservice.getCreditCardMonths(startMonth).subscribe(
        data=>{
          console.log("Retrive credit card month :" + JSON.stringify(data));
          this.creditCardMonth=data;
        }
      );
      

    //populate the credit card year

    this.shopformservice.getCreditCardYears().subscribe(
      data=>{
        console.log("Retrive credit card yeard :" + JSON.stringify(data) );
        this.creditCardYear=data;
        
      }
    )
           



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


  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear :number = new Date().getFullYear();
    const selectedYEar : number = Number(creditCardFormGroup?.value.expirationYear );


    //if the current year equals the selected year,then start with the current month

    let startMonth:number;

    if(currentYear === selectedYEar){
      startMonth=new Date().getMonth()+1;
    }else{
      startMonth=1;
    }


    this.shopformservice.getCreditCardMonths(startMonth).subscribe(
      data =>{
            console.log("retrive credit card months " + JSON.stringify(data));
            this.creditCardMonth=data;
      }
    )
  }
}
