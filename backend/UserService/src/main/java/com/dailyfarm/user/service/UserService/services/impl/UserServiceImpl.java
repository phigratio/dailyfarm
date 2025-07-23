package com.dailyfarm.user.service.UserService.services.impl;

import com.dailyfarm.user.service.UserService.entities.User;
import com.dailyfarm.user.service.UserService.enums.RoleEnum;
import com.dailyfarm.user.service.UserService.enums.UserStatus;
import com.dailyfarm.user.service.UserService.exceptions.ResourceNotFoundException;
import com.dailyfarm.user.service.UserService.repositories.UserRepository;
import com.dailyfarm.user.service.UserService.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


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
    public User getUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("User not found with userId: " + userId));


    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(String id) {
        User user=getUser(id);
        userRepository.delete(user);
    }
    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
    @Override
    public User updateUser(User user) {
        User existingUser=getUser(user.getUserId());
        if (user.getUserName() != null) {
            existingUser.setUserName(user.getUserName());
        }
        if (user.getEmail() != null) {
            existingUser.setEmail(user.getEmail());
        }
        if (user.getPassword() != null) {
            existingUser.setPassword(user.getPassword());
        }
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
        if (user.getRole() != null) {
            existingUser.setRole(user.getRole());
        }
        if (user.getStatus() != null) {
            existingUser.setStatus(user.getStatus());
        }

        return userRepository.save(existingUser);
    }

    public List<User> getUsersByStatus(UserStatus status) {
        return userRepository.findByStatus(status);
    }

    public List<User> getUsersByRole(RoleEnum role) {
        return userRepository.findByRole(role);
    }

    public User updateUserStatus(String userId, UserStatus status) {
        User user = getUser(userId);
        user.setStatus(status);
        return userRepository.save(user);
    }

    public User updateUserRole(String userId, RoleEnum role) {
        User user = getUser(userId);
        user.setRole(role);
        return userRepository.save(user);
    }
}
