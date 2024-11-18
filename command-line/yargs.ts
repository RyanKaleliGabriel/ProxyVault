import yargs from "yargs";
// Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface.

// Parse CLI arguements
// The .help() method automatically adds a --help or -h flag to your CLI tool. When a user includes --help or -h in their command,
// it displays usage instructions for the CLI, including available options, descriptions, and examples.

// The .argv method parses the command-line arguments provided by the user when running the CLI tool. It returns an object containing
// the parsed arguments as key-value pairs.
export const argv = yargs
  .option("port", {
    alias: "p",
    type: "number",
    description: "Port to run the caching proxy server",
    demandOption: false,
  })
  .option("origin", {
    alias: "o",
    type: "string",
    description: "The URL of the origin server to forward requests to",
    demandOption: false,
  })
  .option("clear-cache", {
    alias: "cc",
    type: "boolean",
    description: "Clear the cached data",
  })
  .help().argv as { port: number; origin: string; "clear-cache"?: boolean };
