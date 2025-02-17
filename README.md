

# Containerized Web App  

This is a proof-of-concept website built from the ground up as a learning project. It demonstrates the core concepts of a **React frontend**, a **Django backend**, and how to **containerize the entire application** using Docker.

## Tech Stack

- **Frontend**: React with components from **Ant Design (AntD)**  
- **Authentication**: JSON Web Tokens (JWT) using **SimpleJWT** for secure login and authentication  
- **Backend**: Django  
- **Database**: PostgreSQL  
- **Containerization**: Docker  

## Prerequisites  

Ensure you have **Docker** installed on your system. You can find installation instructions [here](https://docs.docker.com/get-docker/).

Make sure that no other program is running on the following ports:

- **Frontend**: `3000`  
- **Django Backend**: `8000`  
- **Database (PostgreSQL)**: `5432`

## Getting Started  

Follow these steps to set up and run the project:

1. **Clone the repository**  
   ```sh
   git clone https://github.com/tahamudassar/Containerized-Shop
   ```
2. **Navigate into the project directory**  
   ```sh
   cd Containerized-Shop
   ```
3. **Start the application using Docker Compose**  
   ```sh
   docker compose up
   ```
   This will build and start both the React frontend and Django backend inside Docker containers.  

## Default Superuser Credentials  

A Django superuser is automatically created with the following credentials:

- **Email**: `admin@admin.com`  
- **Password**: `12345678`

You can change these credentials by modifying the `backend/entrypoint.sh` file.

