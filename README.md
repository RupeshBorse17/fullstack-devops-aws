# CloudOps Telemetry & Incident Tracker — Full-Stack DevOps on AWS

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-REST%20API-brightgreen?logo=springboot)
![React](https://img.shields.io/badge/React-Vite-blue?logo=react)
![Docker](https://img.shields.io/badge/Docker-Multi--Stage-2496ED?logo=docker)
![AWS](https://img.shields.io/badge/AWS-EC2%20%7C%20ECR%20%7C%20IAM-232F3E?logo=amazonaws)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions)

A containerized full-stack system health and runtime telemetry monitor built with **Spring Boot (Java 21)** and **React (Vite)**, automated end-to-end using **Docker**, **Amazon ECR**, **AWS EC2**, and **GitHub Actions**.

---

## System Architecture

```text
[Developer Workstation (VS Code)]
               │
               │  1. git push origin main
               ▼
[GitHub Repository (fullstack-devops-aws)]
               │
               │  2. Triggers CI/CD Workflow (.github/workflows/deploy.yml)
               ▼
[GitHub Actions Runner (Ubuntu)]
       ├── Builds Multi-Stage Backend Image (Maven + Eclipse Temurin 21 JRE Alpine)
       ├── Builds Multi-Stage Frontend Image (Node Build + Nginx Alpine)
       │
       │  3. Pushes Images via IAM Access Credentials
       ▼
[Amazon ECR (Private Container Registry - ap-south-1)]
               │
               │  4. SSH Deployment Trigger (appleboy/ssh-action)
               ▼
[AWS EC2 Ubuntu Server (t3.micro)]
       ├── Authenticates to ECR via Attached IAM Role (Zero Hardcoded Secrets)
       ├── Pulls Latest Images & Recreates Containers (Docker Compose)
       └── Prunes Stale Images
               │
               │  5. Serves Live Traffic (Port 80 & Port 8080)
               ▼
[End User Browser — Live Telemetry Dashboard]
