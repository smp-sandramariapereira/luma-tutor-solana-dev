import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import Database from "better-sqlite3";

export interface LearnerRecord {
  id: string;
  displayName: string;
  goal: string;
  consentAcceptedAt: string;
  createdAt: string;
  updatedAt: string;
}

const UNUSED_TABLES = [
  "demo_dataset_records",
  "demo_datasets",
  "artifact_verification_runs",
  "activity_evaluations",
  "learning_attempts",
  "hint_usage",
  "learning_activities",
  "learning_paths",
  "evidence",
  "learner_interviews",
  "learning_events",
  "projects",
  "schema_migrations"
] as const;

export class LearnerStore {
  readonly connection: Database.Database;

  constructor(filename: string) {
    mkdirSync(dirname(filename), { recursive: true });
    this.connection = new Database(filename);
    this.connection.pragma("journal_mode = WAL");
    this.migrate();
  }

  async findById(id: string): Promise<LearnerRecord | undefined> {
    const row = this.connection.prepare("SELECT data_json FROM learners WHERE id = ?").get(id) as
      | { data_json: string }
      | undefined;
    if (!row) return undefined;
    return parseLearner(id, JSON.parse(row.data_json) as Record<string, unknown>);
  }

  async requireById(id: string): Promise<LearnerRecord> {
    const learner = await this.findById(id);
    if (!learner) throw new Error("Sessão não encontrada. Comece a sessão à esquerda.");
    return learner;
  }

  async startSession(input: {
    learnerId: string;
    displayName: string;
    goal: string;
    consentToStoreProfile: boolean;
  }): Promise<LearnerRecord> {
    if (!input.consentToStoreProfile) {
      throw new Error(
        "O armazenamento persistente exige consentimento explícito. Uma sessão efêmera ainda não está disponível."
      );
    }
    const now = new Date().toISOString();
    const existing = await this.findById(input.learnerId);
    const learner: LearnerRecord = {
      id: input.learnerId,
      displayName: input.displayName,
      goal: input.goal,
      consentAcceptedAt: existing?.consentAcceptedAt ?? now,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now
    };
    this.connection
      .prepare(
        `INSERT INTO learners(id, data_json, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET data_json = excluded.data_json, updated_at = excluded.updated_at`
      )
      .run(learner.id, JSON.stringify(learner), learner.updatedAt);
    return learner;
  }

  close(): void {
    this.connection.close();
  }

  private migrate(): void {
    this.connection.exec(`
      CREATE TABLE IF NOT EXISTS learners (
        id TEXT PRIMARY KEY,
        data_json TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
    this.connection.pragma("foreign_keys = OFF");
    for (const table of UNUSED_TABLES) {
      this.connection.exec(`DROP TABLE IF EXISTS ${table}`);
    }
    this.connection.pragma("foreign_keys = ON");
  }
}

export function createLearnerStore(repositoryRoot: string, env: NodeJS.ProcessEnv = process.env): LearnerStore {
  const dataDirectory = resolve(repositoryRoot, env.LEARNING_HARNESS_DATA_DIR ?? ".ideathon-harness");
  return new LearnerStore(resolve(dataDirectory, "learning-harness.sqlite"));
}

function parseLearner(id: string, data: Record<string, unknown>): LearnerRecord | undefined {
  const displayName = typeof data.displayName === "string" ? data.displayName.trim() : "";
  const directGoal = typeof data.goal === "string" ? data.goal.trim() : "";
  const legacyGoal = lastDeclaredGoal(data.goals);
  const goal = directGoal || legacyGoal;
  if (!displayName || !goal) return undefined;

  const createdAt = stringOrNow(data.createdAt);
  const updatedAt = stringOrNow(data.updatedAt);
  const consentAcceptedAt =
    stringField(data.consentAcceptedAt) ??
    consentAccepted(data.consent) ??
    createdAt;

  return {
    id: typeof data.id === "string" && data.id.trim() ? data.id : id,
    displayName,
    goal,
    consentAcceptedAt,
    createdAt,
    updatedAt
  };
}

function lastDeclaredGoal(goals: unknown): string {
  if (!Array.isArray(goals) || goals.length === 0) return "";
  const last = goals.at(-1);
  if (!last || typeof last !== "object") return "";
  const description = (last as { description?: unknown }).description;
  if (!description || typeof description !== "object") return "";
  const value = (description as { value?: unknown }).value;
  return typeof value === "string" ? value.trim() : "";
}

function consentAccepted(consent: unknown): string | undefined {
  if (!consent || typeof consent !== "object") return undefined;
  return stringField((consent as { acceptedAt?: unknown }).acceptedAt);
}

function stringField(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function stringOrNow(value: unknown): string {
  return stringField(value) ?? new Date().toISOString();
}
