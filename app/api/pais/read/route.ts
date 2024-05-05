import prisma from "@/lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 s"),
});

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "";
  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);

    return new NextResponse("Too many requests", {
      status: 429,
      headers: {
        "Retry-After": `${retryAfter}`,
      },
    });
  }

  const result = await prisma.pais.findMany({
    select: {
      id: true,
      pais: true,
      gentilico: true,
    },
  });

  return NextResponse.json(result);
}
