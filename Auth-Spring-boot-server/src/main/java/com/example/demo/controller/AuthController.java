package com.example.demo.controller;

import com.example.demo.Security.JwtHelper;
import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.service.CustomUserDetailService;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private CustomUserDetailService userDetailsService;

  @Autowired
  private JwtHelper helper;

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  private Logger logger = LoggerFactory.getLogger(AuthController.class);

  @PostMapping("/create-user")
  public ResponseEntity<AuthResponse> createUser(
    @Valid @RequestBody RegisterRequest userdata
  ) {
    try {
      userdata.setPassword(passwordEncoder.encode(userdata.getPassword()));
      User user = User
        .builder()
        .username(userdata.getUsername())
        .email(userdata.getEmail())
        .phone(userdata.getPhone())
        .password(userdata.getPassword())
        .build();
      userService.createUser(user);

      String token = helper.generateToken(
        userDetailsService.loadUserByUsername(userdata.getUsername())
      );

      AuthResponse response = AuthResponse
        .builder()
        .token(token)
        .username(userdata.getUsername())
        .message("User created successfully")
        .build();
      return new ResponseEntity<>(response, HttpStatus.CREATED);
    } catch (Exception e) {
      logger.error("Error creating user: {}", e.getMessage());
      return new ResponseEntity<>(
        AuthResponse
          .builder()
          .message("Invalid Credential: " + e.getMessage())
          .build(),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(
    @Valid @RequestBody LoginRequest request
  ) {
    UserDetails userDetails = userDetailsService.loaduserByEmail(
      request.getEmail()
    );

    if (userDetails == null) {
      AuthResponse response = AuthResponse
        .builder()
        .message("User not found")
        .build();
      return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    if (
      !passwordEncoder.matches(request.getPassword(), userDetails.getPassword())
    ) {
      AuthResponse response = AuthResponse
        .builder()
        .message("Invalid Password")
        .build();
      return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    String token = this.helper.generateToken(userDetails);

    AuthResponse response = AuthResponse
      .builder()
      .token(token)
      .username(userDetails.getUsername())
      .message("User logged in successfully")
      .build();
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<AuthResponse> exceptionHandler(
    BadCredentialsException ex
  ) {
    return new ResponseEntity<>(
      AuthResponse.builder().message(ex.getMessage()).build(),
      HttpStatus.UNAUTHORIZED
    );
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<AuthResponse> handleValidationExceptions(
    MethodArgumentNotValidException ex
  ) {
    String errors = ex
      .getBindingResult()
      .getFieldErrors()
      .stream()
      .map(error -> error.getField() + ": " + error.getDefaultMessage())
      .collect(Collectors.joining(", "));
    return new ResponseEntity<>(
      AuthResponse.builder().message(errors).build(),
      HttpStatus.BAD_REQUEST
    );
  }
}
