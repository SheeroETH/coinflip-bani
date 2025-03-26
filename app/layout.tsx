import './globals.css';

export const metadata = {
  title: 'CoinFlip BANI',
  description: 'Joue à pile ou face pour gagner des $BANI!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-white font-sans min-h-screen flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}