import TicTacToeClient from "./tic-tac-toe-client";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4 pt-12 md:pt-24 selection:bg-accent selection:text-accent-foreground">
        <TicTacToeClient />
    </main>
  );
}
