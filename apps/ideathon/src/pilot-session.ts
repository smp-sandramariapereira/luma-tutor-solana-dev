import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const LEARNER_COOKIE = "lh_sid";
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24;

const DEV_FALLBACK_SECRET = "dev-ideathon-secret";

export function resolveSessionSecret(env: NodeJS.ProcessEnv, host: string): string {
  const secret = env.PILOT_SESSION_SECRET?.trim();
  if (secret) return secret;
  if (host === "127.0.0.1" || host === "::1" || host === "localhost") {
    return DEV_FALLBACK_SECRET;
  }
  throw new Error("PILOT_SESSION_SECRET é obrigatório quando o servidor escuta na LAN.");
}

export function issueLearnerId(): string {
  return `ideathon-${randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

export function signToken(payload: string, secret: string, issuedAt = Date.now()): string {
  const body = `${payload}.${issuedAt}`;
  return `${body}.${sign(body, secret)}`;
}

export function parseToken(
  token: string | undefined,
  secret: string,
  expectedPayload?: string
): string | undefined {
  if (!token) return undefined;
  const parts = token.split(".");
  if (parts.length < 3) return undefined;
  const signature = parts.at(-1)!;
  const issuedAt = Number(parts.at(-2));
  const payload = parts.slice(0, -2).join(".");
  if (!payload || !Number.isFinite(issuedAt)) return undefined;
  if (Date.now() - issuedAt > COOKIE_MAX_AGE_SECONDS * 1000) return undefined;
  if (!safeEqual(signature, sign(`${payload}.${issuedAt}`, secret))) return undefined;
  if (expectedPayload && payload !== expectedPayload) return undefined;
  return payload;
}

export function readCookie(header: string | string[] | undefined, name: string): string | undefined {
  const raw = Array.isArray(header) ? header.join("; ") : header;
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return undefined;
}

export function serializeCookie(name: string, value: string): string {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE_SECONDS}`;
}

export function expireCookie(name: string): string {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}
