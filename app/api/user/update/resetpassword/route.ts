import { lucia, validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import sendEmailNotification from '@/lib/sendemail';
import { hash } from '@node-rs/argon2';

export async function PUT(req: Request) {
  const { id } = await req.json();
  const { user } = await validateRequest();

  if (!user || user.role !== 'ADMIN') {
    return new Response('Unauthorized', { status: 401 });
  }

  function generatePass() {
    let pass = '';
    let str =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 16; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    return pass;
  }

  const password = generatePass();

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  await lucia.invalidateUserSessions(id);

  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password_hash: passwordHash,
    },
    select: {
      email: true,
    },
  });
  await sendEmailNotification(
    result.email,
    'Um Administrador resetou a sua senha.',
    `${password}`
  );

  return new Response('Senha resetada com sucesso.', {
    status: 201,
    statusText: 'Senha resetada com sucesso.',
  });
}
