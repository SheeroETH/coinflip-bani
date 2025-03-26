'use client';

import React, { useState } from 'react';

const CoinFlip = () => {
  const [, setChoice] = useState<'heads' | 'tails' | null>(null);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(1000);
  const [bet, setBet] = useState<number>(50);

  const flipCoin = async (userChoice: 'heads' | 'tails') => {
    if (bet > balance) {
      setMessage("❌ Tu n'as pas assez de $BANI pour miser autant.");
      return;
    }

    setChoice(userChoice);
    setLoading(true);
    setMessage(null);
    setResult(null);

    try {
      const res = await fetch('/api/flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: userChoice, bet })
      });
      const data = await res.json();
      setResult(data.result);

      if (data.win) {
        setBalance(balance + bet);
        setMessage('🎉 Gagné ! Tu doubles ta mise en $BANI.');
      } else {
        setBalance(balance - bet);
        setMessage('😢 Perdu... Tu perds ta mise.');
      }
    } catch {
      setMessage("Erreur serveur. Réessaie plus tard.");
    }
    

    setLoading(false);
  };

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBet(Number(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-4">CoinFlip BANI 🪙</h1>
      <p className="mb-2">Solde actuel : <span className="text-green-400">{balance} $BANI</span></p>
      <div className="mb-6">
        <label className="mr-2">Mise :</label>
        <input type="number" value={bet} onChange={handleBetChange} className="bg-gray-800 border border-gray-700 rounded px-2 py-1 w-24 text-center" min={1} max={balance} />
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => flipCoin('heads')} disabled={loading} className="bg-blue-600 px-4 py-2 rounded">Pile</button>
        <button onClick={() => flipCoin('tails')} disabled={loading} className="bg-blue-600 px-4 py-2 rounded">Face</button>
      </div>

      {loading && (
        <div className="text-yellow-400 animate-ping">
          🪙 La pièce tourne...
        </div>
      )}

      {result && !loading && (
        <p className="text-xl">
          Résultat : <span className="font-bold">{result === 'heads' ? 'Pile' : 'Face'}</span>
        </p>
      )}

      {message && (
        <div className="mt-4 text-center text-lg font-semibold">
          {message}
        </div>
      )}
    </div>
  );
};

export default CoinFlip;
