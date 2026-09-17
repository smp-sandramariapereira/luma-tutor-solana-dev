import assert from "node:assert/strict";
import { rmSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { LearnerStore } from "../dist/learner-store.js";
import { sessionSnapshot } from "../dist/session-snapshot.js";
import { tempStore } from "./helpers.ts";

describe("learner-store", () => {
  it("recusa sessão sem consentimento", async () => {
    const { store, directory } = tempStore();
    try {
      await assert.rejects(
        () =>
          store.startSession({
            learnerId: "ideathon-1",
            displayName: "Ana",
            goal: "PDAs",
            consentToStoreProfile: false
          }),
        /consentimento explícito/
      );
    } finally {
      store.close();
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it("grava, lê e exige sessão existente", async () => {
    const { store, directory } = tempStore();
    try {
      await store.startSession({
        learnerId: "ideathon-1",
        displayName: "Ana",
        goal: "entender owner",
        consentToStoreProfile: true
      });
      const found = await store.findById("ideathon-1");
      assert.equal(found?.goal, "entender owner");
      await assert.rejects(() => store.requireById("ausente"), /Sessão não encontrada/);
      const snapshot = await sessionSnapshot(store, "ideathon-1", "localnet");
      assert.equal(snapshot.cluster, "localnet");
      assert.equal(snapshot.goal, "entender owner");
    } finally {
      store.close();
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it("lê objetivo legado e remove tabelas mortas", async () => {
    const { store, directory } = tempStore();
    const dbFile = join(directory, "learning-harness.sqlite");
    store.connection.exec("CREATE TABLE projects (id TEXT PRIMARY KEY)");
    store.connection
      .prepare("INSERT INTO learners(id, data_json, updated_at) VALUES (?, ?, ?)")
      .run(
        "legacy-1",
        JSON.stringify({
          id: "legacy-1",
          displayName: "Bia",
          goals: [{ description: { value: "mint Token-2022" } }]
        }),
        new Date().toISOString()
      );
    store.close();
    const reopened = new LearnerStore(dbFile);
    try {
      const learner = await reopened.findById("legacy-1");
      assert.equal(learner?.goal, "mint Token-2022");
      const tables = reopened.connection
        .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
        .all() as Array<{ name: string }>;
      assert.deepEqual(
        tables.map((row) => row.name),
        ["learners"]
      );
    } finally {
      reopened.close();
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
