#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { createIdeathonApp } from "./http-app.js";
import { createLearnerStore } from "./learner-store.js";

const repositoryRoot = fileURLToPath(new URL("../../../", import.meta.url));
const store = createLearnerStore(repositoryRoot, process.env);
const server = createIdeathonApp({ store, env: process.env });

const port = Number(process.env.PORT ?? 4177);
const host = process.env.HOST ?? "127.0.0.1";
server.listen(port, host, () => {
  console.log(`Ideathon Open Toolkit em http://${host}:${port}`);
});

function shutdown(): void {
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
    store.close();
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
