package com.ecommerce.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.ecommerce.entity.Product;

@CrossOrigin("http://localhost:4200/")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	// added for getting the value by category
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
}
