"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  BoardState,
  Difficulty,
  GameMode,
  GameStatus,
  HistoryEntry,
  PlayerData,
  PlayerSymbol,
} from "@/lib/types";
import { GameBoard } from "@/components/game/GameBoard";
import { GameHistory } from "@/components/game/GameHistory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trophy, Users, Cpu, History, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const PLAYER_DATA_KEY = "OASIS_PLAYER_DATA_V1";
const POINTS = { WIN: 10, DRAW: 2, LOSS: -5 };

function calculateWinner(squares: BoardState): { winner: PlayerSymbol; line: number[] } | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as PlayerSymbol, line: lines[i] };
    }
  }
  return null;
}

export default function TicTacToeClient() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [tempUsername, setTempUsername] = useState("");
  const [tempPlayer2Name, setTempPlayer2Name] = useState("");

  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [winner, setWinner] = useState<{ winner: PlayerSymbol; line: number[] } | null>(null);

  const [player1, setPlayer1] = useState<{ name: string; symbol: PlayerSymbol }>({ name: "", symbol: "X" });
  const [player2, setPlayer2] = useState<{ name: string; symbol: PlayerSymbol }>({ name: "", symbol: "O" });
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedData = localStorage.getItem(PLAYER_DATA_KEY);
      if (savedData) {
        setPlayerData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Could not load player data", error);
    }
  }, []);

  useEffect(() => {
    if (playerData && isMounted) {
      try {
        localStorage.setItem(PLAYER_DATA_KEY, JSON.stringify(playerData));
      } catch (error) {
        console.error("Could not save player data", error);
      }
    }
  }, [playerData, isMounted]);

  const updateHistoryAndPoints = useCallback((result: 'win' | 'loss' | 'draw', opponent: string) => {
    if (!playerData) return;
    const pointsChange = result === 'win' ? POINTS.WIN : result === 'draw' ? POINTS.DRAW : POINTS.LOSS;
    const newHistoryEntry: HistoryEntry = {
      id: new Date().toISOString(),
      opponent,
      result,
      points: pointsChange,
      date: new Date().toLocaleDateString(),
    };
    setPlayerData(prev => prev ? {
      ...prev,
      points: prev.points + pointsChange,
      history: [newHistoryEntry, ...prev.history],
    } : null);
  }, [playerData]);

  const handleGameEnd = useCallback((currentBoard: BoardState) => {
    const winnerInfo = calculateWinner(currentBoard);
    if (winnerInfo) {
      setWinner(winnerInfo);
      setGameStatus("win");
      if (gameMode === 'cpu') {
        const result = winnerInfo.winner === player1.symbol ? 'win' : 'loss';
        updateHistoryAndPoints(result, `CPU (${difficulty})`);
      } else if(gameMode === '1v1') {
        // In 1v1, only the main user's record is tracked
        const winningPlayer = winnerInfo.winner === player1.symbol ? player1 : player2;
        if (winningPlayer.name === playerData?.username) {
            updateHistoryAndPoints('win', player2.name);
        }
      }
    } else if (currentBoard.every(Boolean)) {
      setGameStatus("draw");
      if (gameMode === 'cpu') {
        updateHistoryAndPoints('draw', `CPU (${difficulty})`);
      }
    }
  }, [gameMode, difficulty, player1, player2, updateHistoryAndPoints, playerData?.username]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus("playing");
    setWinner(null);
    setGameMode(null);
    setDifficulty(null);
  };
  
  const handleSetUsername = () => {
    if (tempUsername.trim()) {
      setPlayerData({
        username: tempUsername.trim(),
        points: 0,
        history: [],
      });
    }
  };
  
  const handleSelectMode = (mode: GameMode) => {
    setGameMode(mode);
    if (mode === '1v1') {
      setPlayer1({ name: playerData?.username ?? "Player 1", symbol: "X" });
    }
  };

  const startCpuGame = (level: Difficulty) => {
    setDifficulty(level);
    setPlayer1({ name: playerData?.username ?? "Player 1", symbol: "X" });
    setPlayer2({ name: `CPU (${level})`, symbol: "O" });
  };

  const start1v1Game = () => {
    if (tempPlayer2Name.trim()) {
      setPlayer2({ name: tempPlayer2Name.trim(), symbol: "O" });
      setTempPlayer2Name("");
    }
  };
  
  const makeCpuMove = useCallback((currentBoard: BoardState) => {
    const availableSquares = currentBoard.map((sq, i) => sq === null ? i : null).filter(i => i !== null);
    if (availableSquares.length === 0) return;

    let move: number;

    const findWinningMove = (player: PlayerSymbol) => {
        for (const i of availableSquares) {
            const tempBoard = [...currentBoard];
            tempBoard[i as number] = player;
            if (calculateWinner(tempBoard)?.winner === player) {
                return i;
            }
        }
        return null;
    }

    if (difficulty === 'hard') {
        const bestMove = findBestMove(currentBoard, 'O');
        move = bestMove;
    } else if (difficulty === 'medium') {
        // 1. Win if possible
        const cpuWinMove = findWinningMove('O');
        if(cpuWinMove !== null) { move = cpuWinMove; }
        // 2. Block if necessary
        else {
            const playerWinMove = findWinningMove('X');
            if (playerWinMove !== null) { move = playerWinMove; }
            // 3. Random move
            else { move = availableSquares[Math.floor(Math.random() * availableSquares.length)] as number; }
        }
    } else { // Easy
        move = availableSquares[Math.floor(Math.random() * availableSquares.length)] as number;
    }

    setTimeout(() => {
        const newBoard = [...currentBoard];
        if (newBoard[move] === null) {
            newBoard[move] = 'O';
            setBoard(newBoard);
            setIsXNext(true);
            handleGameEnd(newBoard);
        }
    }, 500);
  }, [difficulty, handleGameEnd]);

  const findBestMove = (board: BoardState, player: PlayerSymbol): number => {
      let bestVal = -Infinity;
      let bestMove = -1;

      for (let i = 0; i < board.length; i++) {
          if (board[i] === null) {
              const newBoard = [...board];
              newBoard[i] = player;
              let moveVal = minimax(newBoard, 0, false);
              if (moveVal > bestVal) {
                  bestMove = i;
                  bestVal = moveVal;
              }
          }
      }
      return bestMove;
  }

  const minimax = (board: BoardState, depth: number, isMax: boolean): number => {
      const winnerInfo = calculateWinner(board);
      if (winnerInfo?.winner === 'O') return 10 - depth;
      if (winnerInfo?.winner === 'X') return depth - 10;
      if (board.every(Boolean)) return 0;

      if (isMax) {
          let best = -Infinity;
          for (let i = 0; i < board.length; i++) {
              if (board[i] === null) {
                  const newBoard = [...board];
                  newBoard[i] = 'O';
                  best = Math.max(best, minimax(newBoard, depth + 1, !isMax));
              }
          }
          return best;
      } else {
          let best = Infinity;
          for (let i = 0; i < board.length; i++) {
              if (board[i] === null) {
                  const newBoard = [...board];
                  newBoard[i] = 'X';
                  best = Math.min(best, minimax(newBoard, depth + 1, !isMax));
              }
          }
          return best;
      }
  }

  const handleSquareClick = (index: number) => {
    if (winner || board[index]) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    handleGameEnd(newBoard);
  };
  
  useEffect(() => {
    if (gameMode === 'cpu' && !isXNext && gameStatus === 'playing') {
      makeCpuMove(board);
    }
  }, [isXNext, board, gameMode, gameStatus, makeCpuMove]);

  if (!isMounted) {
    return <div className="text-2xl font-bold tracking-widest animate-pulse">LOADING OASIS...</div>;
  }

  if (!playerData) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline text-3xl">Welcome to the OASIS</DialogTitle>
            <DialogDescription>
              Please enter your username to begin your journey.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="username" className="sr-only">Username</Label>
              <Input id="username" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} placeholder="Your awesome name..." />
            </div>
            <Button type="submit" size="sm" className="px-3" onClick={handleSetUsername}>
              Enter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const renderGameStatus = () => {
    if (gameStatus === "win" && winner) {
      const winnerPlayer = winner.winner === player1.symbol ? player1 : player2;
      return <span className="text-accent">{winnerPlayer.name} wins!</span>;
    }
    if (gameStatus === "draw") {
      return <span>It's a draw!</span>;
    }
    return <span>Turn: <span className="text-primary font-semibold">{isXNext ? player1.name : player2.name}</span> ({isXNext ? 'X' : 'O'})</span>;
  };
  
  const renderGameScreen = () => (
    <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4 text-lg">
            <div className="text-left">
                <p className={cn("font-bold transition-all", isXNext && gameStatus === 'playing' ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" : "text-muted-foreground")}>
                  {player1.name} (X)
                </p>
                {gameMode === '1v1' && <p className="text-sm text-muted-foreground">User: {playerData.username}</p>}
            </div>
            <div className="text-center font-headline text-2xl tracking-wider">
                {renderGameStatus()}
            </div>
            <div className="text-right">
                <p className={cn("font-bold transition-all", !isXNext && gameStatus === 'playing' ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" : "text-muted-foreground")}>
                  {player2.name} (O)
                </p>
                 {gameMode === '1v1' && player2.name === playerData.username && <p className="text-sm text-muted-foreground">User</p>}
            </div>
        </div>
      <GameBoard board={board} onSquareClick={handleSquareClick} isGameOver={gameStatus !== 'playing'} winningLine={winner?.line ?? null} />
      <div className="text-center mt-4">
        <Button onClick={resetGame} variant="outline">New Game</Button>
      </div>
    </div>
  );

  const renderModeSelection = () => (
    <Card className="w-full max-w-md animate-fade-in">
        <CardHeader>
            <CardTitle className="font-headline text-3xl">Choose Your Challenge</CardTitle>
            <CardDescription>How will you conquer the grid today?</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <Button size="lg" className="w-full justify-start text-lg p-6" onClick={() => handleSelectMode('cpu')}>
                <Cpu className="mr-4 h-6 w-6" /> Play vs CPU
            </Button>
            <Button size="lg" className="w-full justify-start text-lg p-6" onClick={() => handleSelectMode('1v1')}>
                <Users className="mr-4 h-6 w-6" /> 1 vs 1
            </Button>
        </CardContent>
    </Card>
  );

  const renderCpuDifficultySelection = () => (
     <Dialog open={true}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-headline text-3xl">Select CPU Difficulty</DialogTitle>
                <DialogDescription>Choose the intelligence of your opponent.</DialogDescription>
            </DialogHeader>
             <RadioGroup onValueChange={(val: Difficulty) => startCpuGame(val)} className="my-4 space-y-2">
                <Label htmlFor="easy" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/20 hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    Easy
                    <RadioGroupItem value="easy" id="easy" />
                </Label>
                <Label htmlFor="medium" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/20 hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    Medium
                    <RadioGroupItem value="medium" id="medium" />
                </Label>
                <Label htmlFor="hard" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/20 hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    Hard
                    <RadioGroupItem value="hard" id="hard" />
                </Label>
            </RadioGroup>
        </DialogContent>
    </Dialog>
  );

  const render1v1Prompt = () => (
    <Dialog open={true}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-headline text-3xl">Player Names</DialogTitle>
                <DialogDescription>Who is challenging you?</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label>Player 1 (X)</Label>
                    <Input value={player1.name} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="p2name">Player 2 (O)</Label>
                    <Input id="p2name" value={tempPlayer2Name} onChange={(e) => setTempPlayer2Name(e.target.value)} placeholder="Enter Player 2's name" />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={start1v1Game}>Start Game</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );

  const renderContent = () => {
    if (gameMode === null) return renderModeSelection();
    if (gameMode === 'cpu' && difficulty === null) return renderCpuDifficultySelection();
    if (gameMode === '1v1' && !player2.name) return render1v1Prompt();
    return renderGameScreen();
  }

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
        <header className="text-center mb-8">
            <h1 className="text-5xl font-bold font-headline tracking-widest text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">
                OASIS Tic-Tac-Toe
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center justify-center gap-4">
                <span>Welcome, <strong className="text-primary">{playerData.username}</strong></span>
                <span className="flex items-center gap-1"><Trophy className="h-4 w-4 text-accent" />{playerData.points} pts</span>
            </p>
        </header>

        <Tabs defaultValue="game" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="game" className="gap-1"><Flame className="h-4 w-4"/>Game</TabsTrigger>
                <TabsTrigger value="history" className="gap-1"><History className="h-4 w-4"/>History</TabsTrigger>
            </TabsList>
            <TabsContent value="game" className="mt-6 flex justify-center">
                {renderContent()}
            </TabsContent>
            <TabsContent value="history" className="mt-6">
                <GameHistory history={playerData.history} />
            </TabsContent>
        </Tabs>
    </div>
  );
}
