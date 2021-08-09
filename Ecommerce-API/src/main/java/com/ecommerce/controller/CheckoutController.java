package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.Purchase;
import com.ecommerce.dto.PurchaseResponce;
import com.ecommerce.service.CheckoutService;

@RestController
@RequestMapping("/api/checkout/")
public class CheckoutController {

	private CheckoutService checkoutService;

	@Autowired
	public CheckoutController(CheckoutService checkoutService) {

		this.checkoutService = checkoutService;
	}

	@PostMapping("/purchase")
	public PurchaseResponce placeorder(@RequestBody Purchase purchase) {
		PurchaseResponce purchaseResponce = checkoutService.placeOrder(purchase);
		return purchaseResponce;
	}
}
