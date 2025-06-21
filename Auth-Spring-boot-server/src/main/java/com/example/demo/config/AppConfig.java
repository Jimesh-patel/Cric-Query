package com.example.demo.config;

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class AppConfig {

  // @Bean
  // public UserDetailsService userDetailsService(
  //   PasswordEncoder passwordEncoder
  // ) {
  //   UserDetails userDetails = User
  //     .builder()
  //     .username("admin")
  //     .password(passwordEncoder.encode("admin123"))
  //     .roles("USER")
  //     .build();
  //   return new InMemoryUserDetailsManager(userDetails);
  // }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(
    AuthenticationConfiguration builder
  ) throws Exception {
    return builder.getAuthenticationManager();
  }
}
