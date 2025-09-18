package com.khanhlms.medical_store.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("${app.api.prefix}/users")
public class UserController {
    @GetMapping("/")
    public String getUser() {
        return "Xin chào";
    }
    
}
