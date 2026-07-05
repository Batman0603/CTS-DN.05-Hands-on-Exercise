package com.cognizant.spring_learn.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.spring_learn.model.AuthenticationResponse;
import com.cognizant.spring_learn.util.JwtUtil;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/authenticate")
    public AuthenticationResponse authenticate(
            @RequestHeader("Authorization") String authHeader) {

        LOGGER.info("START");

        String base64 =
                authHeader.substring(6);

        byte[] decoded =
                Base64.getDecoder().decode(base64);

        String credentials =
                new String(decoded, StandardCharsets.UTF_8);

        String username =
                credentials.split(":")[0];

        String token =
                JwtUtil.generateToken(username);

        LOGGER.info("END");

        return new AuthenticationResponse(token);
    }
}