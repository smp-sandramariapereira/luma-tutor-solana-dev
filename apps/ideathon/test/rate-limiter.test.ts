import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { FixedWindowRateLimiter, RateLimitError } from "../dist/rate-limiter.js";

describe("rate-limiter", () => {
  it("rejeita limite inválido", () => {
    assert.throws(() => new FixedWindowRateLimiter(0, 1000), /limite deve ser positivo/);
  });

  it("bloqueia a mensagem extra na mesma janela", () => {
    let now = 1_000;
    const limiter = new FixedWindowRateLimiter(2, 60_000, () => now);
    limiter.consume("a");
    limiter.consume("a");
    assert.throws(() => limiter.consume("a"), (error: unknown) => {
      assert.ok(error instanceof RateLimitError);
      assert.equal(error.statusCode, 429);
      assert.equal(error.retryAfterSeconds, 60);
      return true;
    });
    now += 60_000;
    limiter.consume("a");
  });
});
