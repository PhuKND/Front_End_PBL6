package com.khanhlms.medical_store.services;

import com.khanhlms.medical_store.dtos.requests.LoginRequest;
import com.khanhlms.medical_store.dtos.response.LoginResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationService {
    final AuthenticationManager  authenticationManager;

    @Value("${app.security.expiresIn}")
    public Integer expiresIn;

    public LoginResponse hanlelogin(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        authenticationManager.authenticate(token);
        return LoginResponse.builder()
                .accessToken("Thanh cong nhes cung ")
                .expiresIn(expiresIn)
                .build();
    }
}

