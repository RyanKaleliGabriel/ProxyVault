# Caching Proxy

> This is a command line interface(CLI) tool that starts caching proxy server, it forwards requests tot he actual server and caches the responses. If the same request is made again, it will return the cahed response instead of forwarding the request to the server.

## Table of Contents

- [Take Aways](#take-aways)
- [Requirements](#requirements)
- [Additionals](#additionals)
- [Stack](#stack)
- [Usage](#usage)
  - [Installation](#installation)
  - [Example Commands](#example-commands)
  - [Using Docker](#using-docker)
  - [Expected Output](#expected-output)
- [Data display](#data-display)
- [Project URL](#project-url)

## Take Aways

- Understanding how caches work
- Building a caching proxy server to cache responses from other servers

## Requirements

User should be able to start the caching proxy server by running a command like following:

    ```bash
    caching-proxy --port <number> --origin <url>
    ```

- --port is the port on which the caching proxy server will run.

- --origin is the URL of the server to which the requests will be forwarded

- Add headers to the response that indicate whether the response is from the cache or the server

  `````bash # If the response is from the cache
  X-Cache: HIT

      #If the response is from the origin server
      X-Cache: MISS
      ````
  `````

## Additionals

You should also provide a way to clear the cache by running a command like following:

    ```bash
    caching-proxy --clear-cache
    ```

## Stack

- Node Js
- Docker
- Redis

## Usage

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/RyanKaleliGabriel/ProxyVault.git
   cd ProxyVault.git
   ```

2. Set Environment Variables: The github API requires authentication for certain request. To avoid rate limits, you can use a personal Github access token. Create a .env file and add the your access token.

   ```bash
   REDIS_HOST=<your_redis_host>
   REDIS_PORT=<your_redis_port>
   PORT=<your_apps_port_number>
   URL=<your_main_server_url>
   ```

3. Running the CLI: Compile the typecript files then call it with the required arguements.

   ```bash
   npm start

   node dist/caching-proxy.js --port <your_apps_port_number> --origin <your_main_server_url>


   #Clearing the cache

   node dist/caching-proxy.js --clear-cache

   ```

   - [port] (required): The port on which the caching proxy server will run.
   - [origin] (required): The URL of the server to which the requests will be forwarded..
   - [clear-cache] (optional): Clears the cache.

### Example Commands

1. Forwarding request to the origin server.

   ```bash
       node dist/caching-proxy.js --port <your_apps_port_number> --origin <your_main_server_url>
   ```

2. Clearing the Cache

   ```bash
   node dist/caching-proxy.js --clear-cache
   ```

### Using Docker

1. Pull the image from docker hub

   ```
   docker pull ryankaleligabriel/proxyvault-app

   ```

2. Build the image

   ```
   docker build -t ryankaleligabriel/proxyvault-app .
   ```

3. Run the image

   ```
   docker run --name <your_container_name> -d -p 3000
   ```

4. Check for your output

   ```
   docker logs <your_container_name>
   ```

### Expected Output

```bash
1. Initial Request
   Caching proxy server is running on http://localhost:3000
   Forwarding requests to origin server: https://dummyjson.com
   Cache miss. Fetching from origin...
   Data cached

2. Other requests
   Caching proxy server is running on http://localhost:3000
   Forwarding requests to origin server: https://dummyjson.com/products
   Cache hit!
```

## Data display

Data or web page will be displayed in json on http://localhost:3000 where the caching proxy server will start.

## Project URL

https://roadmap.sh/projects/caching-server

