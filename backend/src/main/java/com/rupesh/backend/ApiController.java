package com.rupesh.backend;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    @GetMapping("/health")
    public Map<String, Object> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Spring Boot Backend");
        response.put("timestamp", LocalDateTime.now());
        return response;
    }



    @GetMapping("/system-info")
    public Map<String, Object> getSystemInfo() {
        Map<String, Object> response = new HashMap<>();
        response.put("project", "Fullstack DevOps on AWS");
        response.put("architecture", "Spring Boot + React + Docker + CI/CD");
        response.put("cloudProvider", "Amazon Web Services");
        response.put("serverTime", LocalDateTime.now().toString());
        return response;
    }
}