package com.ecommerce.service;

import com.ecommerce.dto.Purchase;
import com.ecommerce.dto.PurchaseResponce;

public interface CheckoutService {

	PurchaseResponce placeOrder(Purchase purchase);

}
