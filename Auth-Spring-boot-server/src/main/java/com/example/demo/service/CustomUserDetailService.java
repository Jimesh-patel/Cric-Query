package com.example.demo.service;

import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {
    return userRepository
      .findByUsername(username)
      .orElseThrow(() ->
        new UsernameNotFoundException(
          "User not found with username: " + username
        )
      );
  }

  public UserDetails loaduserByEmail(String email)
    throws UsernameNotFoundException {
    return userRepository
      .findByEmail(email)
      .orElseThrow(() ->
        new UsernameNotFoundException("User not found with email: " + email)
      );
  }

  public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
    return userRepository
      .findById(id)
      .orElseThrow(() ->
        new UsernameNotFoundException("User not found with id: " + id)
      );
  }
}
