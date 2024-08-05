import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

  // Validate and sanitize input here
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required'}, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add user to the database
  const newUser = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'User register successfully', user: newUser }, { status: 201 });

  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
