import { createApp } from "./app.js";
import { MovieManager } from "./mysql/moviedb.js";

createApp({movieManager: MovieManager})