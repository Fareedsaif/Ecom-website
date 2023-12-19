package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.Cart;
import com.ecommerce.model.Customer;




@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	
	void deleteCartByCustomer(Customer c);
}