package com.ecommerce.service;

import java.util.List;

import com.ecommerce.model.Order;
import com.ecommerce.model.TransactionDetails;


public interface OrderService {
	Order addOrder(Order order, long customerId, long cartId);

	Order getOrderById(long orderId);

	Order updateOrder(Order order, long orderId);

	List<Order> getOrderByCustomerId(long customerId);

	List<Order> getAllOrders();

	// List<Order> getAllOrdersByCartId(long cartId);
	
	Order addOrderItem(Order order,long customerId);
	
	void deleteOrder(long orderId);
	
	TransactionDetails createTransaction(Double amount);
}