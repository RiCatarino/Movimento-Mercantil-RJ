import prisma from '@/lib/prisma';
import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import sendEmailNotification from '@/lib/sendemail';

export async function POST(req: Request) {
  const { useremail } = await req.json();
  const email = useremail.toLowerCase();

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
  if (!validRegex.test(email)) {
    return new Response('Email Inválido', {
      status: 400,
      statusText: 'Email Inválido',
    });
  }

  const existe = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  });

  if (existe) {
    return new Response('Email já existe', {
      status: 409,
      statusText: 'Email já existe',
    });
  }
  /* Function to generate combination of password */
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
  const userId = generateIdFromEntropySize(16); // 16 characters long

  // TODO: check if email is already used
  await prisma.user.create({
    data: {
      id: userId,
      email: email,
      password_hash: passwordHash,
    },
  });
  await sendEmailNotification(
    email,
    'Sua senha temporária',
    `Sua senha temporária é: ${password}`
  );

  return new Response('Usuário criado com sucesso.', {
    status: 201,
    statusText: 'Usuário criado com sucesso',
  });
}
