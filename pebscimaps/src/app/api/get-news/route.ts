import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Execute the SELECT query to fetch all news entries
    const newsEntries = await sql`SELECT * FROM News;`;

    // Convert the result set to JSON and return it
    return NextResponse.json(newsEntries, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the execution of the query
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch news entries.' }, { status: 500 });
  }
}