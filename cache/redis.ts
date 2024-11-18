import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;


//Create a redis client
const client = createClient({
  url: `redis://${redisHost}:${redisPort}`,
});

client.on("error", (err: any) => console.log("Redis client error"));
client.connect();

export default client;
