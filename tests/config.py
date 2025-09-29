from decouple import config


ENVIRONMENT = config("ENVIRONMENT", default="local")

URLS = {
    "local": "http://localhost:3000/",
    "development": "http://localhost:3000/",
    "staging": "http://localhost:3000/",
    "production": "http://localhost:3000/"
}

BASE_URL = BASE_URL = URLS.get(ENVIRONMENT, URLS["local"])
