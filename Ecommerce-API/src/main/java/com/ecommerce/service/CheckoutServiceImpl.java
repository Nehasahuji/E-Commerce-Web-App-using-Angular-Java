package com.ecommerce.service;

import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.Purchase;
import com.ecommerce.dto.PurchaseResponce;
import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;
import com.ecommerce.repository.CustomerRepository;

@Service
public class CheckoutServiceImpl implements CheckoutService {

	private CustomerRepository customerRepository;

	@Autowired
	public CheckoutServiceImpl(CustomerRepository customerRepository) {
		super();
		this.customerRepository = customerRepository;
	}

	@Override
	@Transactional
	public PurchaseResponce placeOrder(Purchase purchase) {

//		retrieve order from dto

		Order order = purchase.getOrder();

//		Generate tracking number

		String orderTrackingNumber = genrateOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);

//		populate order with the order item

		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item -> order.add(item));

//		populate order with billingAddress and ShippingAddress
		order.setBilliingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());

//		populate customer with order

		Customer customer = purchase.getCustomer();
		customer.add(order);

//		save to database
		customerRepository.save(customer);

//		return a response
		return new PurchaseResponce(orderTrackingNumber);
	}

	private String genrateOrderTrackingNumber() {

//		Generate a random key or id
// for details see: https://en.wikipedia.org/wiki/Universally_unique_identifier

		return UUID.randomUUID().toString();
	}

}
