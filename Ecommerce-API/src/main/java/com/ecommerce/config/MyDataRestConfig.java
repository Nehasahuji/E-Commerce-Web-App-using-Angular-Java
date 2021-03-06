package com.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.entity.State;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	@Value("${allowed.origins}")
	private String[] theAllowedOrigins;

//	create an instance of entity manager
	private EntityManager entityManager;

//    autowired entity manager
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		// TODO Auto-generated method stub
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

		HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH };

		// disable Http methods for product: PUT POST AND DELETE

		disableHttpMethods(Product.class, config, theUnsupportedActions);

		// disable Http methods for productCategory: PUT POST AND DELETE

		disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);

		// disable Http methods for country: PUT POST AND DELETE

		disableHttpMethods(Country.class, config, theUnsupportedActions);

		// disable Http methods for state: PUT POST AND DELETE

		disableHttpMethods(State.class, config, theUnsupportedActions);

		// disable Http methods for Order: PUT POST AND DELETE

		disableHttpMethods(Order.class, config, theUnsupportedActions);
		/// call an internal helper method to expose ids;
		exposeIds(config);

//		configuration cors mapping

//		cors.addMapping("/api/**").allowedOriginPatterns("http://localhost:4200/");

//		cors.addMapping(config.getBasePath() + "/**").allowedOrigins("theallowedOrigins");

		cors.addMapping(config.getBasePath() + "/**").allowedOriginPatterns(theAllowedOrigins);

	}

	// added method to disable various parameter
	private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config,
			HttpMethod[] theUnsupportedActions) {
		config.getExposureConfiguration().forDomainType(theClass)
				.withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
				.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
	}

	private void exposeIds(RepositoryRestConfiguration config) {
		// TODO Auto-generated method stub

		// expose entitty id

		/// get a list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

		// create an aarray of entity types
		List<Class> entityClasses = new ArrayList<>();

		// get the entity types for the entities

		for (EntityType tempEntityType : entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}

		// expose the entity ids for the array of entity/domaintype
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);

	}

}
