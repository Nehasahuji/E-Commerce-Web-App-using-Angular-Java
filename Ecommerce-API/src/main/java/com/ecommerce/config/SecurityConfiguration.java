package com.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.okta.spring.boot.oauth.Okta;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		protect endpoind /api/orders

		http.authorizeRequests().antMatchers("/api/orders/**").authenticated().and().oauth2ResourceServer().jwt();

		http.cors();

//	disable CSRF sice we are not using Cookies fro session tracking
		http.csrf().disable();

//		force a non empty response body for 401's to make the response more friendly
		Okta.configureResourceServer401ResponseBody(http);

	}

}
