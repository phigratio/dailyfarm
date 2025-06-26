package com.dailyfarm.user.service.UserService.services;

import com.dailyfarm.user.service.UserService.entities.User;
import com.dailyfarm.user.service.UserService.enums.RoleEnum;
import com.dailyfarm.user.service.UserService.enums.UserStatus;

import java.util.List;

public interface UserService {

    User saveUser(User user);
    User getUser(String id);
    List<User> getAllUsers();
    void deleteUser(String id);
    User updateUser(User user);

    List<User> getUsersByStatus(UserStatus status);
    List<User> getUsersByRole(RoleEnum role);
    User updateUserStatus(String userId, UserStatus status);
    User updateUserRole(String userId, RoleEnum role);
}
