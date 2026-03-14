import os

app_env = os.getenv('APP_ENV', 'production')
print(f"APP_ENV: {app_env}")

if app_env == 'development':
    print("Running in development mode")
elif app_env == 'production':
    print("Running in production mode")
else:
    print(f"Running in {app_env} mode")
