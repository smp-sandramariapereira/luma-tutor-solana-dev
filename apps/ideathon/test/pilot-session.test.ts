import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  COOKIE_MAX_AGE_SECONDS,
  expireCookie,
  issueLearnerId,
  parseToken,
  readCookie,
  resolveSessionSecret,
  serializeCookie,
  signToken
} from "../dist/pilot-session.js";

describe("pilot-session", () => {
  it("rejeita token ausente, curto, adulterado ou expirado", () => {
    const secret = "teste-secret";
    assert.equal(parseToken(undefined, secret), undefined);
    assert.equal(parseToken("a.b", secret), undefined);
    const token = signToken("learner-1", secret);
    assert.equal(parseToken(token.replace(/\./g, "x"), secret), undefined);
    const expired = signToken("learner-1", secret, Date.now() - (COOKIE_MAX_AGE_SECONDS + 10) * 1000);
    assert.equal(parseToken(expired, secret), undefined);
  });

  it("aceita token válido e recusa payload inesperado", () => {
    const secret = "teste-secret";
    const token = signToken("learner-1", secret);
    assert.equal(parseToken(token, secret), "learner-1");
    assert.equal(parseToken(token, secret, "outro"), undefined);
  });

  it("exige segredo fora de loopback", () => {
    assert.equal(resolveSessionSecret({}, "127.0.0.1"), "dev-ideathon-secret");
    assert.throws(
      () => resolveSessionSecret({}, "192.168.0.10"),
      /PILOT_SESSION_SECRET é obrigatório/
    );
    assert.equal(resolveSessionSecret({ PILOT_SESSION_SECRET: " lan " }, "10.0.0.2"), "lan");
  });

  it("emite cookie de sessão e cookie expirado", () => {
    assert.match(issueLearnerId(), /^ideathon-[a-f0-9]{16}$/);
    assert.match(serializeCookie("lh_sid", "abc"), /Max-Age=86400/);
    assert.match(expireCookie("lh_sid"), /lh_sid=;.*Max-Age=0/);
    assert.equal(readCookie("lh_sid=abc; other=1", "lh_sid"), "abc");
    assert.equal(readCookie(undefined, "lh_sid"), undefined);
  });
});
