
'use client';

import React, { useState } from 'react';

export default function CoinFlip() {
  const [result, setResult] = useState<'pile' | 'face' | null>(null);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(50);
  const [loading, setLoading] = useState(false);

  const flip = async (choice: 'pile' | 'face') => {
    if (bet > balance) {
      setMessage("❌ Pas assez de $BANI");
      return;
    }

    setLoading(true);
    setMessage('');
    setResult(null);

    const response = await fetch('/api/flip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ choice, bet }),
    });

    const data = await response.json();
    setResult(data.result === 'heads' ? 'pile' : 'face');

    if (data.win) {
      setBalance(balance + bet);
      setMessage('🎉 Gagné !');
    } else {
      setBalance(balance - bet);
      setMessage('😢 Perdu...');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">CoinFlip BANI 🪙</h1>
      <p className="text-lg mb-2">Solde : <span className="text-green-400">{balance} $BANI</span></p>

      <div className="mb-4">
        <label className="mr-2">Mise :</label>
        <input
          type="number"
          min={1}
          max={balance}
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          className="text-black px-2 py-1 rounded border border-gray-400"
        />
      </div>

      <div className="flex gap-6 mb-6">
        <button
          onClick={() => flip('pile')}
          disabled={loading}
          className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition"
        >
          Pile
        </button>
        <button
          onClick={() => flip('face')}
          disabled={loading}
          className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition"
        >
          Face
        </button>
      </div>

      {loading && <div className="animate-spin text-3xl">🪙</div>}

      {result && !loading && (
        <p className="text-2xl font-semibold mt-4">
          Résultat : {result === 'pile' ? '🪙 Pile' : '💠 Face'}
        </p>
      )}

      {message && <p className="text-xl mt-4">{message}</p>}
    </div>
  );
}
