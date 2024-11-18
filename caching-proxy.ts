import http from "http"
import { handleRequest } from ".";
import { argv } from "./command-line/yargs";

// Create a proxy server
const server = http.createServer(handleRequest);

server.listen(argv.port, () => {
  console.log(
    `Caching proxy server is running on http://localhost:${argv.port}`
  );
  console.log(`Forwarding requests to origin server: ${argv.origin}`);
});
