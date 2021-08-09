package com.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class MyAppConfig implements WebMvcConfigurer {

	@Value("${allowed.origins}")
	private String[] theAllowedOrigins;

	@Value("${spring.data.rest.base-path}")
	private String basePath;

}
