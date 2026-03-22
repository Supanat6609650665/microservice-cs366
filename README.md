# HealthCare Service

This project is a **microservice-based** system for helping user service **find nearest hospital**, **creating transfer request then this service will send user's transfer request to hospital service so hospital service can process their decision asynchronously**, and user can **track transfer request status either by polling API or event/message consumption**. This project is **CS366 term project** and built with **TypeScript**.

## Key Features

- Create and manage transfer requests
- Asynchronous communication using SNS and SQS
- Real-time status tracking via polling or event consumption

## Project Structure
```
microservice-cs366/
├─ config -> all configuration, client init
├─ events -> publish message function
├─ handlers -> application entry, validate http request, process message
├─ lib -> util function, data transfer object function, run-time type def validation function
├─ repositories -> database layer
├─ services -> validate business logic, data transfer object
├─ types -> type, interface
```

## Tech Stacks
- API Gateway -> HTTP request
- Amazon RDS -> database (MySQL)
- Amazon SNS & SQS -> event-driven messaging
- Lambda -> function
- EC2 -> manage database
- CloudWatch -> error logging