import type { LearnerStore } from "./learner-store.js";

export interface SessionSnapshot {
  learnerId: string;
  displayName?: string;
  goal?: string;
  cluster: "localnet" | "devnet";
}

export function publicCluster(value: string | undefined): "localnet" | "devnet" {
  return value?.trim().toLowerCase() === "devnet" ? "devnet" : "localnet";
}

export async function sessionSnapshot(
  store: LearnerStore,
  learnerId: string,
  cluster: "localnet" | "devnet"
): Promise<SessionSnapshot> {
  const learner = await store.requireById(learnerId);
  const snapshot: SessionSnapshot = {
    learnerId: learner.id,
    displayName: learner.displayName,
    goal: learner.goal,
    cluster
  };
  return snapshot;
}
