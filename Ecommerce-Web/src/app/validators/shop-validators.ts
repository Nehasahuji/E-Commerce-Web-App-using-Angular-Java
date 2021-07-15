import { FormBuilder, FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {
  //white space validation

  static notOnlyWithWhitespace(control: FormControl ) : ValidationErrors {
    ///Check if string only contain whitespace
    if ((control.value != null) && control.value.trim().length === 0) {
      ///invalid ,return error object

      return { 'notOnlyWhiteSpace': true };
    } 
    else {
      //valid return nulll

       return null!;
    }
  }
}
