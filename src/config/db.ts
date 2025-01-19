import { connect } from "mongoose";
import { config } from "./configuration.js";

export const databaseConnection = async () => {
  try {
    return await connect(config.database_url);
  } catch (error) {
    console.error(`Failed to connect Database: ${error}`);
    process.exit(1);
  }
};
