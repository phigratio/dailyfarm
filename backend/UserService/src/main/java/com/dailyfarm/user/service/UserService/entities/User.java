package com.dailyfarm.user.service.UserService.entities;


import com.dailyfarm.user.service.UserService.enums.RoleEnum;
import com.dailyfarm.user.service.UserService.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="dailyfarm_users")
public class User {

    @Id
    @Column(name = "userId", nullable = false)
    private String userId;


    @Column(nullable = false)
    private String userName;


    @Column(nullable = false,unique = true)
    private String email;


    @Column(nullable = false)
    private String password;

    private String phoneNumber;

    private String division;
    private String district;
    private String upazila;
    private String village;

    private String about;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "role",nullable = false)
    private RoleEnum role;

    @Enumerated(EnumType.STRING)
    @Column(name="status",nullable = false)
    private UserStatus status=UserStatus.ACTIVE;


}
