import http, { IncomingMessage, ServerResponse } from "http";
import https from "https";
import { URL } from "url";
import client from "./cache/redis";
import { argv } from "./command-line/yargs";

const cacheTTL = 3600;

export async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const originUrl = argv.origin;
  const clearCommand = argv["clear-cache"];
  const requestUrl = `${originUrl}`;

  if (clearCommand) {
    await client.FLUSHALL();
    console.log("Successfully deleted cached data");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Cache cleared successfully");
    return;
  }
  //Check if the data is already cached in redis
  const cachedData = await client.get(requestUrl);

  if (cachedData) {
    console.log("Cache hit!");
    res.setHeader("X-Cache", "HIT");
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    return res.end(cachedData);
  } else {
    console.log("Cache miss. Fetching from origin...");
    // Parsing the URL string using the WHATWG API:
    const parsedUrl = new URL(requestUrl);

    // Create options
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      method: req.method,
    };

    // Choose HTTPS or HTTP based on the protocol
    const protocol = parsedUrl.protocol === "https:" ? https : http;

    const proxyReq = protocol.request(options, (originRes) => {
      let data = "";

      originRes.on("data", (chunk: any) => {
        data += chunk;
      });

      originRes.on("end", async () => {
        // Ccahe the response
        await client.setEx(requestUrl, cacheTTL, data);
        console.log("Data cached");

        // Set the X-Cache header to miss
        res.setHeader("X-Cache", "MISS");
        res.statusCode = originRes.statusCode || 200;
        return res.end(data);
      });
    });

    proxyReq.on("error", (error) => {
      console.error(`Request error: ${error.message}`);
      res.statusCode = 500;
      res.end("Error occurred while fetching the data.");
    });

    // The req.pipe method in Node.js is used to stream data from one readable stream to another writable stream. Specifically, in the context of HTTP requests and responses,
    // req.pipe(destination):

    // Reads data from the request (req) as it arrives in chunks.
    // Writes the data to the destination stream (e.g., an HTTP request to another server).
    // This allows you to forward the body of the request from the client to another destination without having to manually handle the chunks of data.

    // When working with proxy servers, forwarding the request's body (such as form data or JSON payloads) to another server is a common use case. Using req.pipe(destination) simplifies this process, as it:

    // Handles the stream of data efficiently.
    // Automatically manages backpressure, ensuring data is written only when the destination is ready.
    req.pipe(proxyReq);
  }
}
