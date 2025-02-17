# Use an official Python runtime as a parent image
FROM python:3.8

# Install PostgreSQL client
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy requirements.txt
COPY requirements.txt ./  

# Install dependencies 
RUN pip install --no-cache-dir -r requirements.txt 

# Copy the rest of the backend code
COPY . .  

# Change the working directory to the ecom folder
WORKDIR /usr/src/app/ecom  

# Expose the port the backend runs on
EXPOSE 8000  

# Run migrations and start the server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
