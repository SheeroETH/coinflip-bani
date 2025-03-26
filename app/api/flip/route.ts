
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { choice, bet } = await req.json();

    if (!['pile', 'face'].includes(choice) || typeof bet !== 'number' || bet <= 0) {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
    }

    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const win = (choice === 'pile' && result === 'heads') || (choice === 'face' && result === 'tails');

    return NextResponse.json({ result, win });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
