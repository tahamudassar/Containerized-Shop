INSTALLED_APPS = [
    # ...existing apps...
    'corsheaders',
    # ...existing apps...
]

MIDDLEWARE = [
    # ...existing middleware...
    'corsheaders.middleware.CorsMiddleware',
    # ...existing middleware...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Add your frontend URL here
    "http://127.0.0.1:3000",
]
