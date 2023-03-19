# Creating Docker Image

```bash
docker build -t my-app .
```

# Instantiating Docker Container

Create a file called `.env.production` inside `config` folder with contents:

```
NODE_ENV=production
HOSTNAME=127.0.0.1
PORT=80
```

```bash
docker run --rm -d network="host" --name my-app-container --env-file config/.env.production my-app
```

Then run

```bash
# should output 'Hello, World'
curl http://localhost:80
```

# Using Docker Compose

- `docker compose up`
- `docker compose down`