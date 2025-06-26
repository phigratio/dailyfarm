package com.dailyfarm.user.service.UserService.contorllers;

import com.dailyfarm.user.service.UserService.entities.User;
import com.dailyfarm.user.service.UserService.enums.RoleEnum;
import com.dailyfarm.user.service.UserService.enums.UserStatus;
import com.dailyfarm.user.service.UserService.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    //create
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
      User user1= userService.saveUser(user);
      return ResponseEntity.status(HttpStatus.CREATED).body(user1);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable String userId) {
        User user = userService.getUser(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUser() {
        List<User> allUsers = userService.getAllUsers();

        return ResponseEntity.status(HttpStatus.OK).body(allUsers);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User user1= userService.updateUser(user);
        return ResponseEntity.ok(user1);
    }

    @DeleteMapping
    public ResponseEntity<User> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<User>> getUsersByStatus(@PathVariable UserStatus status) {
        List<User> users = userService.getUsersByStatus(status);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable RoleEnum role) {
        List<User> users = userService.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }

    @PatchMapping("/{userId}/status")
    public ResponseEntity<User> updateUserStatus(@PathVariable String userId, @RequestParam UserStatus status) {
        User updatedUser = userService.updateUserStatus(userId, status);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{userId}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable String userId, @RequestParam RoleEnum role) {
        User updatedUser = userService.updateUserRole(userId, role);
        return ResponseEntity.ok(updatedUser);
    }
}
