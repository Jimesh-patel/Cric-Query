package com.example.demo.Security;

import com.example.demo.dto.AuthResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(
    HttpServletRequest request,
    HttpServletResponse response,
    AuthenticationException authException
  ) throws IOException, ServletException {
    response.setContentType("application/json");
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

    AuthResponse authResponse = AuthResponse
      .builder()
      .message(authException.getMessage())
      .build();

    ObjectMapper mapper = new ObjectMapper();
    String jsonResponse = mapper.writeValueAsString(authResponse);

    response.getWriter().write(jsonResponse);
    response.getWriter().flush();
  }
}
