import http from "http";
import { handleRequest } from ".";
import { argv } from "./command-line/yargs";
import dotenv from "dotenv";

dotenv.config();
// Create a proxy server
const server = http.createServer(handleRequest);
const port = argv.port || process.env.PORT;
const origin = argv.origin || process.env.URL;

server.listen(port, () => {
  console.log(`Caching proxy server is running on http://localhost:${port}`);
  console.log(`Forwarding requests to origin server: ${origin}`);
});
