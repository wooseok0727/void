package com.wooseok.blog.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/check")
    public String check() {
        return "check";
    }

    @PostMapping("/logout")
    public String logout() {
        return "logout";
    }
}
