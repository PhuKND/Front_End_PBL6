package com.khanhlms.medical_store.controllers;

import com.khanhlms.medical_store.dtos.requests.CreateUserRequest;
import com.khanhlms.medical_store.dtos.response.ApiResponse;
import com.khanhlms.medical_store.services.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("${app.api.prefix}/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    @GetMapping("")
    public String getUser() {
        return "Xin chào";
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<Boolean>> createUser(@RequestBody CreateUserRequest userRequest){
        ApiResponse<Boolean> response = ApiResponse.<Boolean>builder()
                .code(HttpStatus.CREATED.value())
                .message("User created successfully")
                .data(this.userService.handlCreateUser(userRequest))
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
