import { lucia, validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import { hash } from '@node-rs/argon2';

export async function PUT(req: Request) {
  const { password } = await req.json();
  const { user } = await validateRequest();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  await lucia.invalidateUserSessions(user.id);

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password_hash: passwordHash,
    },
  });
  return Response.json(result);
}
