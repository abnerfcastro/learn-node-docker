# Creating Docker Image

```bash
docker build -t my-app .
```

# Instantiating Docker Container

Set these environment variables:

```
NODE_ENV=production
HOSTNAME=127.0.0.1
PORT=80
```

```bash
docker run --rm -d network="host" --name my-app-container --env-file config/.env.production my-app
```

Then open `http://localhost:80/` in the browser.

# Using Docker Compose

- `docker compose up`
- `docker compose down`