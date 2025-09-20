package com.dailyfarm.user.service.UserService.services.impl;

import com.dailyfarm.user.service.UserService.entities.User;
import com.dailyfarm.user.service.UserService.enums.RoleEnum;
import com.dailyfarm.user.service.UserService.enums.UserStatus;
import com.dailyfarm.user.service.UserService.exceptions.ResourceNotFoundException;
import com.dailyfarm.user.service.UserService.repositories.UserRepository;
import com.dailyfarm.user.service.UserService.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Override
    public User saveUser(User user) {

        String userId=UUID.randomUUID().toString();
        user.setUserId(userId);

        if (user.getRole() == null) {
            user.setRole(RoleEnum.USER);
        }

        if (user.getStatus() == null) {
            user.setStatus(UserStatus.ACTIVE);
        }

        return userRepository.save(user);
    }

    @Override
    @Cacheable(value = "users", key = "#userId")
    public User getUser(String userId) {
        logger.info("Fetching user with ID {} from the database (cache miss).", userId);
        return userRepository.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("User not found with userId: " + userId));


    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @CacheEvict(value = "users", key = "#id")
    public void deleteUser(String id) {
        logger.info("Deleting user with ID {}. Evicting from cache.", id);
        User user=getUser(id);
        userRepository.delete(user);
    }
    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }
    @Override
    @CachePut(value = "users", key = "#user.userId")
    public User updateUser(User user) {
        logger.info("Updating user with ID {}. Updating cache.", user.getUserId());
        User existingUser=getUser(user.getUserId());
        if (user.getUserName() != null) {
            existingUser.setUserName(user.getUserName());
        }
        //if (user.getEmail() != null) {
          //  existingUser.setEmail(user.getEmail());
        //}
        //if (user.getPassword() != null) {
          //  existingUser.setPassword(user.getPassword());

        //}
        if (user.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(user.getPhoneNumber());
        }
        if (user.getDivision() != null) {
            existingUser.setDivision(user.getDivision());
        }
        if (user.getDistrict() != null) {
            existingUser.setDistrict(user.getDistrict());
        }
        if (user.getUpazila() != null) {
            existingUser.setUpazila(user.getUpazila());
        }
        if (user.getVillage() != null) {
            existingUser.setVillage(user.getVillage());
        }
        if (user.getAbout() != null) {
            existingUser.setAbout(user.getAbout());
        }
        //if (user.getRole() != null) {
          //  existingUser.setRole(user.getRole());
        //}
        //if (user.getStatus() != null) {
          //  existingUser.setStatus(user.getStatus());
        //}

        return userRepository.save(existingUser);
    }

    public List<User> getUsersByStatus(UserStatus status) {
        return userRepository.findByStatus(status);
    }

    public List<User> getUsersByRole(RoleEnum role) {
        return userRepository.findByRole(role);
    }

    @Override
    @CachePut(value = "users", key = "#userId")
    public User updateUserStatus(String userId, UserStatus status) {
        logger.info("Updating status for user with ID {}. Updating cache.", userId);
        User user = getUser(userId);
        user.setStatus(status);
        return userRepository.save(user);
    }

    @Override
    @CachePut(value = "users", key = "#userId")
    public User updateUserRole(String userId, RoleEnum role) {

        logger.info("Updating role for user with ID {}. Updating cache.", userId);
        User user = getUser(userId);
        user.setRole(role);
        return userRepository.save(user);

    }
}

