package com.dailyfarm.user.service.UserService.repositories;

import com.dailyfarm.user.service.UserService.entities.User;

import com.dailyfarm.user.service.UserService.enums.RoleEnum;
import com.dailyfarm.user.service.UserService.enums.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUserName(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUserNameAndPassword(String username, String password);

    List<User> findByStatus(UserStatus status);
    List<User> findByRole(RoleEnum role);
    List<User> findByRoleAndStatus(RoleEnum role, UserStatus status);
}
