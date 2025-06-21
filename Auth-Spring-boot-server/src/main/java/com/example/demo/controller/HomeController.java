package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.CustomUserDetailService;
import com.example.demo.service.UserService;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

  @Autowired
  private UserService userService;

  @Autowired
  private CustomUserDetailService userDetailsService;

  @GetMapping("/")
  public String server() {
    return "Server is running";
  }

  @GetMapping("/hello")
  public String hello() {
    return "Hello, World!";
  }

  @GetMapping("/user")
  public String user(Principal principal) {
    return "Hello, " + principal.getName() + "!";
  }

  @GetMapping("/users")
  public List<User> getAllUsers() {
    return userService.getAllUsers();
  }

  @GetMapping("/user-data")
  public ResponseEntity<User> getUserData(Principal principal) {
    if (principal == null) {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    String username = principal.getName();
    if (username == null || username.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    User user = (User) userDetailsService.loadUserByUsername(username);
    if (user == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<String> exceptionHandler(BadCredentialsException ex) {
    return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
  }
}
