"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function CoinFlipGame() {
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [balance, setBalance] = useState(950)
  const [message, setMessage] = useState<string | null>(null)

  const flipCoin = async (choice: "Pile" | "Face") => {
    if (isFlipping) return

    setIsFlipping(true)
    setResult(null)
    setMessage(null)

    try {
      const response = await fetch("/api/flip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          choice: choice.toLowerCase(), // "pile" ou "face"
          bet: 100,
        }),
      })

      const data = await response.json()
      const outcome = data.result === "heads" ? "Pile" : "Face"
      const win = data.win

      setResult(outcome)
      setMessage(win ? "🎉 Gagné !" : "😢 Perdu...")

      if (win) {
        setBalance((prev) => prev + 100)
      } else {
        setBalance((prev) => Math.max(0, prev - 100))
      }
    } catch (error) {
      console.error("Erreur pendant le tirage :", error)
      setMessage("Erreur serveur.")
    }

    setIsFlipping(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md overflow-hidden rounded-xl border-0 bg-gray-800 shadow-xl">
        <div className="flex flex-col items-center p-6">
          <h1 className="mb-6 text-center text-3xl font-bold text-white">CoinFlip BANI 🪙</h1>

          <div className="mb-4 rounded-full bg-gray-700 px-6 py-2 text-xl font-semibold text-yellow-400">
            {balance} $BANI
          </div>

          <div className="relative my-8 h-40 w-40">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotateY: isFlipping ? 1440 : 0,
                scale: isFlipping ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <div className="h-40 w-40 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg">
                <div className="flex h-full items-center justify-center text-6xl text-black font-bold">
                  {result === "Pile" ? "P" : result === "Face" ? "F" : "?"}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mb-6 h-8 text-center text-xl font-medium text-white">
            {message && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {message}
              </motion.div>
            )}
          </div>

          <div className="flex w-full gap-4">
            <Button
              onClick={() => flipCoin("Pile")}
              disabled={isFlipping}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 py-6 text-lg font-bold hover:from-purple-700 hover:to-blue-700"
            >
              Pile
            </Button>
            <Button
              onClick={() => flipCoin("Face")}
              disabled={isFlipping}
              className="flex-1 bg-gradient-to-r from-pink-600 to-orange-600 py-6 text-lg font-bold hover:from-pink-700 hover:to-orange-700"
            >
              Face
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
