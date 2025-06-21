package com.example.demo.repository;

import com.example.demo.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  public Optional<User> findById(Long id);
  public Optional<User> findByUsername(String username);
  public Optional<User> findByEmail(String email);
}
