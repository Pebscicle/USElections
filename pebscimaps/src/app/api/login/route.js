import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log('At /api/login: ');
    console.log('Email:', email);
    console.log('Password:', password);

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.users.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Secret key for signing JWTs
    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const token = jwt.sign(
        { email: user.email },
        SECRET_KEY,
        { expiresIn: '8h' }
    );

    // At this point, the user is authenticated
    // You might want to create a session or JWT token here

    return NextResponse.json({ 
      message: 'Login successful', 
      token: token,
      user: { 
        email: user.email 
      } 
    }, { status: 200 });

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}