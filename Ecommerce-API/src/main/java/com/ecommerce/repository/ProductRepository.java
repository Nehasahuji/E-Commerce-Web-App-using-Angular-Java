package com.ecommerce.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

import com.ecommerce.entity.Product;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

	// added for getting the value by category
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

	// Added for getting value by name
	Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

}
