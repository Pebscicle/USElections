import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.SECRET_KEY;

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1]; // Assumes the format "Bearer <token>"

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // Return the user's profile information
    return NextResponse.json({ 
      message: 'Profile data retrieved', 
      user: { email: decoded.email,
            secretMessage: 'This is a secret message.'
       }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}