package com.example.demo.dto;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Builder
@Getter
@Setter
@ToString
public class RegisterRequest {

  @NotBlank(message = "Username is required")
  private String username;

  @Email(message = "Invalid email format")
  @NotBlank(message = "Email is required")
  private String email;

  @NotBlank(message = "Phone number is required")
  private String phone;

  @NotBlank(message = "Password is required")
  private String password;
}
