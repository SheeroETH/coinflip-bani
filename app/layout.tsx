
import './globals.css';

export const metadata = {
  title: 'CoinFlip BANI v2',
  description: 'Un jeu de pile ou face stylé et cartoon pour gagner des $BANI!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
