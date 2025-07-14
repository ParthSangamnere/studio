
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  BoardState,
  Difficulty,
  GameMode,
  GameStatus,
  HistoryEntry,
  PlayerData,
  PlayerSymbol,
  Character,
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
import { Trophy, Users, Cpu, History, Ship, Bone, Music, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { StrawHatTitle } from "@/components/game/StrawHatTitle";
import Image from "next/image";
import { AvatarSelector } from "@/components/game/AvatarSelector";
import { useToast } from "@/hooks/use-toast";

const PLAYER_DATA_KEY = "OASIS_PLAYER_DATA_V1";
const POINTS = { WIN: 10, DRAW: 2, LOSS: -5 };

const characters: Character[] = [
  { id: 'luffy', name: 'Luffy', avatarUrl: '/characters/luffy.png' },
  { id: 'zoro', name: 'Zoro', avatarUrl: '/characters/zoro.png' },
  { id: 'nami', name: 'Nami', avatarUrl: '/characters/nami.png' },
  { id: 'sanji', name: 'Sanji', avatarUrl: '/characters/sanji.png' },
  { id: 'shanks', name: 'Shanks', avatarUrl: '/characters/shanks.png' },
  { id: 'usopp', name: 'Usopp', avatarUrl: '/characters/usopp.png' },
  { id: 'chopper', name: 'Chopper', avatarUrl: '/characters/chopper.png' },
  { id: 'robin', name: 'Robin', avatarUrl: '/characters/robin.png' },
  { id: 'franky', name: 'Franky', avatarUrl: '/characters/franky.png' },
  { id: 'brook', name: 'Brook', avatarUrl: '/characters/brook.png' },
  { id: 'jinbe', name: 'Jinbe', avatarUrl: '/characters/jinbe.png' },
  { id: 'ace', name: 'Ace', avatarUrl: '/characters/ace.png' },
];

const cpuCharacter: Character = { id: 'marine', name: 'Marine', avatarUrl: '/characters/marine.png' };

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
  const { toast } = useToast();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [tempUsername, setTempUsername] = useState("");
  const [tempPlayer2Name, setTempPlayer2Name] = useState("");
  
  const [player1Character, setPlayer1Character] = useState<Character | null>(null);
  const [player2Character, setPlayer2Character] = useState<Character | null>(null);

  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [winner, setWinner] = useState<{ winner: PlayerSymbol; line: number[] } | null>(null);

  const [player1, setPlayer1] = useState<{ name: string; symbol: PlayerSymbol; avatar: Character | null }>({ name: "", symbol: "X", avatar: null });
  const [player2, setPlayer2] = useState<{ name: string; symbol: PlayerSymbol; avatar: Character | null }>({ name: "", symbol: "O", avatar: null });
  
  const [isMounted, setIsMounted] = useState(false);
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedData = localStorage.getItem(PLAYER_DATA_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (!parsedData.history) { // Simple data migration if history is missing
          parsedData.history = [];
        }
        setPlayerData(parsedData);
      }
      audioRef.current = new Audio('/drums-of-liberation.mp3');
      audioRef.current.loop = true;

    } catch (error) {
      console.error("Could not load player data or audio", error);
    }
     return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
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

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };


  const updateHistoryAndPoints = useCallback((result: 'win' | 'loss' | 'draw', opponent: string, pointsChange: number) => {
    if (!playerData) return;
    const newHistoryEntry: HistoryEntry = {
      id: new Date().toISOString(),
      opponent,
      result,
      points: pointsChange,
      date: new Date().toLocaleDateString(),
    };
    setPlayerData(prev => {
      if (!prev) return null;
      const updatedHistory = [newHistoryEntry, ...(prev.history || [])];
      return {
        ...prev,
        points: prev.points + pointsChange,
        history: updatedHistory,
      };
    });
  }, [playerData]);
  
  const handleGameEnd = useCallback((currentBoard: BoardState) => {
    const winnerInfo = calculateWinner(currentBoard);
    if (winnerInfo) {
      setWinner(winnerInfo);
      setGameStatus("win");
      const isPlayer1Win = winnerInfo.winner === player1.symbol;
      if (gameMode === 'cpu') {
        const result = isPlayer1Win ? 'win' : 'loss';
        const points = isPlayer1Win ? POINTS.WIN : POINTS.LOSS;
        updateHistoryAndPoints(result, `CPU (${difficulty})`, points);
      } else if (gameMode === '1v1' && playerData) {
        // In 1v1, only Player 1's history is tracked.
        if (isPlayer1Win) {
          updateHistoryAndPoints('win', player2.name, POINTS.WIN);
        } else {
           updateHistoryAndPoints('loss', player2.name, POINTS.LOSS);
        }
      }
    } else if (currentBoard.every(Boolean)) {
      setGameStatus("draw");
      if ((gameMode === 'cpu' || gameMode === '1v1') && playerData) {
        const opponent = gameMode === 'cpu' ? `CPU (${difficulty})` : player2.name;
        updateHistoryAndPoints('draw', opponent, POINTS.DRAW);
      }
    }
  }, [gameMode, difficulty, player1, player2, updateHistoryAndPoints, playerData]);


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus("playing");
    setWinner(null);
    setGameMode(null);
    setDifficulty(null);
    setPlayer1({ name: "", symbol: "X", avatar: null });
    setPlayer2({ name: "", symbol: "O", avatar: null });
    setPlayer1Character(null);
    setPlayer2Character(null);
    setShowAvatarSelection(false);
  };
  
  const handleSetUsername = (e?: React.FormEvent) => {
    e?.preventDefault();
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
    setShowAvatarSelection(true);
    setPlayer1({ ...player1, name: playerData?.username ?? "Player 1" });
  };

  const handleAvatarSelect = (p1?: Character, p2?: Character) => {
      setPlayer1Character(p1 || null);
      setPlayer2Character(p2 || null);
      setShowAvatarSelection(false);

      if (gameMode === 'cpu' && p1) {
          // Now we trigger difficulty selection, so don't set difficulty here.
          // This state will be used to show the difficulty dialog.
          setDifficulty(null); 
      } else if (gameMode === '1v1' && p1 && p2) {
          // Trigger 1v1 name prompt
          setTempPlayer2Name("");
      }
  };

  const startCpuGame = (level: Difficulty) => {
    setDifficulty(level);
    setPlayer1({ name: playerData?.username ?? "Player 1", symbol: "X", avatar: player1Character });
    setPlayer2({ name: `CPU (${level})`, symbol: "O", avatar: cpuCharacter });
  };

  const start1v1Game = () => {
    if (tempPlayer2Name.trim()) {
      setPlayer1({ name: playerData?.username ?? "Player 1", symbol: "X", avatar: player1Character });
      setPlayer2({ name: tempPlayer2Name.trim(), symbol: "O", avatar: player2Character });
      setTempPlayer2Name("");
    }
  };
  
  const makeCpuMove = useCallback((currentBoard: BoardState) => {
    const availableSquares = currentBoard.map((sq, i) => sq === null ? i : null).filter(i => i !== null) as number[];
    if (availableSquares.length === 0) return;

    let move: number;

    const findWinningMove = (player: PlayerSymbol) => {
        for (const i of availableSquares) {
            const tempBoard = [...currentBoard];
            tempBoard[i] = player;
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
        const cpuWinMove = findWinningMove('O');
        if(cpuWinMove !== null) { move = cpuWinMove; }
        else {
            const playerWinMove = findWinningMove('X');
            if (playerWinMove !== null) { move = playerWinMove; }
            else { move = availableSquares[Math.floor(Math.random() * availableSquares.length)]; }
        }
    } else { // Easy
        move = availableSquares[Math.floor(Math.random() * availableSquares.length)];
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
      return bestMove !== -1 ? bestMove : (board.findIndex(s => s === null) ?? -1);
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
    if (winner || board[index] || gameStatus !== 'playing') return;
    
    const currentTurnPlayer = isXNext ? player1.symbol : player2.symbol;
    if (gameMode === 'cpu' && currentTurnPlayer === 'O') {
      return; // Prevent human from playing as O in CPU mode
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    const nextPlayerIsX = !isXNext;
    setIsXNext(nextPlayerIsX);
    
    // Check for game end immediately after human move
    const gameResultCheckBoard = [...newBoard];
    const gameResult = calculateWinner(gameResultCheckBoard);

    if (gameResult || !gameResultCheckBoard.some(sq => sq === null)) {
      handleGameEnd(gameResultCheckBoard);
    } else if (gameMode === 'cpu' && !nextPlayerIsX) {
      makeCpuMove(gameResultCheckBoard);
    }
  };
  
  if (!isMounted) {
    return <div className="text-2xl font-bold tracking-widest animate-pulse">LOADING...</div>;
  }

  if (!playerData) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-headline text-3xl text-primary">What's Your Name, Pirate?</DialogTitle>
            <DialogDescription>
              Every legend has a beginning. State your name.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSetUsername} className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="username" className="sr-only">Username</Label>
              <Input id="username" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} placeholder="e.g. Straw Hat Luffy" />
            </div>
            <Button type="submit" size="sm" className="px-3">
              Set Sail!
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  const renderGameStatus = () => {
    if (gameStatus === "win" && winner) {
      const winnerPlayer = winner.winner === player1.symbol ? player1 : player2;
      return <span className="text-accent">{winnerPlayer.name} is the winner!</span>;
    }
    if (gameStatus === "draw") {
      return <span>It's a draw!</span>;
    }
    const currentPlayer = isXNext ? player1 : player2;
    const isCpuTurn = gameMode === 'cpu' && currentPlayer.symbol === 'O';
    if(isCpuTurn) {
      return <span>Marine is thinking...</span>;
    }
    return <span><span className="text-primary font-semibold">{currentPlayer.name}'s</span> turn ({currentPlayer.symbol})</span>;
  };
  
  const renderGameScreen = () => (
    <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 animate-float">
        <Card className="p-4 bg-card/70 border-2 border-border/50">
            <div className="flex flex-col items-center gap-2 text-center">
                 {player1.avatar && <Image src={player1.avatar.avatarUrl} alt={player1.avatar.name} width={80} height={80} className="rounded-full border-4 border-primary" />}
                <p className={cn("font-bold text-lg transition-all", isXNext && gameStatus === 'playing' ? "text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]" : "text-muted-foreground")}>
                  {player1.name} (X)
                </p>
            </div>
        </Card>
        <div className="flex flex-col items-center">
            <div className="text-center font-headline text-xl md:text-2xl tracking-wider mb-4">
                {renderGameStatus()}
            </div>
            <GameBoard board={board} onSquareClick={handleSquareClick} isGameOver={gameStatus !== 'playing'} winningLine={winner?.line ?? null} />
            <div className="text-center mt-6">
                <Button onClick={resetGame} variant="secondary" size="lg">New Bounty</Button>
            </div>
        </div>
        <Card className="p-4 bg-card/70 border-2 border-border/50">
            <div className="flex flex-col items-center gap-2 text-center">
                {player2.avatar && <Image src={player2.avatar.avatarUrl} alt={player2.avatar.name} width={80} height={80} className="rounded-full border-4" />}
                <p className={cn("font-bold text-lg transition-all", !isXNext && gameStatus === 'playing' ? "text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]" : "text-muted-foreground")}>
                  {player2.name} (O)
                </p>
            </div>
        </Card>
    </div>
  );

  const renderModeSelection = () => (
    <Card className="w-full max-w-md animate-float border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="font-headline text-3xl text-center">Choose Your Voyage</CardTitle>
            <CardDescription className="text-center">A pirate's life is full of choices.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <Button size="lg" className="w-full justify-center text-lg p-6" onClick={() => handleSelectMode('cpu')}>
                <Bone className="mr-4 h-6 w-6" /> Battle a Marine
            </Button>
            <Button size="lg" className="w-full justify-center text-lg p-6" onClick={() => handleSelectMode('1v1')}>
                <Users className="mr-4 h-6 w-6" /> Crewmate Duel
            </Button>
        </CardContent>
    </Card>
  );

  const renderCpuDifficultySelection = () => (
     <Dialog open={true}>
        <DialogContent className="bg-card border-border">
            <DialogHeader>
                <DialogTitle className="font-headline text-3xl">Marine Rank</DialogTitle>
                <DialogDescription>How strong is this Marine?</DialogDescription>
            </DialogHeader>
             <RadioGroup onValueChange={(val: Difficulty) => startCpuGame(val)} className="my-4 space-y-2">
                <Label htmlFor="easy" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/20 hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    Seaman
                    <RadioGroupItem value="easy" id="easy" />
                </Label>
                <Label htmlFor="medium" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/20 hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    Captain
                    <RadioGroupItem value="medium" id="medium" />
                </Label>
                <Label htmlFor="hard" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/20 hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    Admiral
                    <RadioGroupItem value="hard" id="hard" />
                </Label>
            </RadioGroup>
        </DialogContent>
    </Dialog>
  );

  const render1v1Prompt = () => (
    <Dialog open={true}>
        <DialogContent className="bg-card border-border">
            <DialogHeader>
                <DialogTitle className="font-headline text-3xl">Crewmate's Name</DialogTitle>
                <DialogDescription>Who dares to challenge you?</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); start1v1Game(); }} className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label>Pirate 1 (X)</Label>
                    <Input value={player1.name} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="p2name">Pirate 2 (O)</Label>
                    <Input id="p2name" value={tempPlayer2Name} onChange={(e) => setTempPlayer2Name(e.target.value)} placeholder="Enter crewmate's name" />
                </div>
                 <DialogFooter>
                    <Button type="submit">Start Duel</Button>
                </DialogFooter>
            </form>
           
        </DialogContent>
    </Dialog>
  );

  const renderAvatarSelection = () => (
     <AvatarSelector
        characters={characters}
        onSelect={handleAvatarSelect}
        mode={gameMode!}
        player1Name={playerData?.username ?? 'Player 1'}
    />
  )

  const renderContent = () => {
    if (gameMode === null) return renderModeSelection();
    if (showAvatarSelection) return renderAvatarSelection();
    if (gameMode === 'cpu' && difficulty === null) return renderCpuDifficultySelection();
    if (gameMode === '1v1' && !player2.name) return render1v1Prompt();
    if ((gameMode === 'cpu' && difficulty) || (gameMode === '1v1' && player2.name)) return renderGameScreen();
    return renderModeSelection(); // Fallback
  }

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
        <header className="w-full text-center mb-4 relative">
            <StrawHatTitle />
            <div className="mt-4 flex items-center justify-center gap-4 text-muted-foreground border-t-2 border-primary pt-2">
                 <span>Welcome, Captain <strong className="text-primary font-bold">{playerData.username}</strong></span>
                <span className="flex items-center gap-1"><Trophy className="h-4 w-4 text-accent" />{playerData.points} Berries</span>
            </div>
            <Button onClick={toggleMusic} variant="ghost" size="icon" className="absolute top-0 right-0">
                {isMusicPlaying ? <MicOff /> : <Music />}
                <span className="sr-only">{isMusicPlaying ? "Turn music off" : "Turn music on"}</span>
            </Button>
        </header>

        <Tabs defaultValue="game" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card/80">
                <TabsTrigger value="game" className="gap-1"><Ship className="h-4 w-4"/>Game</TabsTrigger>
                <TabsTrigger value="history" className="gap-1"><History className="h-4 w-4"/>Logbook</TabsTrigger>
            </TabsList>
            <TabsContent value="game" className="mt-6 flex justify-center">
                {renderContent()}
            </TabsContent>
            <TabsContent value="history" className="mt-6 animate-float">
                <GameHistory history={playerData.history} />
            </TabsContent>
        </Tabs>
    </div>
  );
}

    