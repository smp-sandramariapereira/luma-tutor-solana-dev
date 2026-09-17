export class RateLimitError extends Error {
  readonly statusCode = 429;
  readonly retryAfterSeconds: number;

  constructor(message: string, retryAfterSeconds: number) {
    super(message);
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

interface WindowState {
  startedAt: number;
  count: number;
}

export class FixedWindowRateLimiter {
  private readonly windows = new Map<string, WindowState>();

  constructor(
    private readonly limit: number,
    private readonly windowMilliseconds: number,
    private readonly now: () => number = Date.now
  ) {
    if (!Number.isInteger(limit) || limit < 1) throw new Error("O limite deve ser positivo.");
  }

  consume(key: string): void {
    const timestamp = this.now();
    const current = this.windows.get(key);
    if (!current || timestamp - current.startedAt >= this.windowMilliseconds) {
      this.windows.set(key, { startedAt: timestamp, count: 1 });
      return;
    }
    if (current.count >= this.limit) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((this.windowMilliseconds - (timestamp - current.startedAt)) / 1000)
      );
      throw new RateLimitError(
        "Limite temporário de mensagens atingido. Tente novamente em instantes.",
        retryAfterSeconds
      );
    }
    current.count += 1;
  }
}
