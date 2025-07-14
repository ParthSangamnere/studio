"use client";

import { cn } from "@/lib/utils";
import type { BoardState, PlayerSymbol } from "@/lib/types";
import { IconX, IconO } from "@/components/icons";

interface GameBoardProps {
  board: BoardState;
  onSquareClick: (index: number) => void;
  isGameOver: boolean;
  winningLine: number[] | null;
}

const Square = ({
  value,
  onClick,
  disabled,
  isWinner,
}: {
  value: PlayerSymbol | null;
  onClick: () => void;
  disabled: boolean;
  isWinner: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "aspect-square w-24 h-24 md:w-32 md:h-32 rounded-lg bg-card/50 border-4 border-double border-foreground/50 flex items-center justify-center p-2 transition-all duration-300 ease-in-out",
      "hover:bg-primary/20 hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
      "disabled:cursor-not-allowed",
      isWinner && "bg-primary/30 border-primary"
    )}
    aria-label={`Square ${value ? `with ${value}` : "empty"}`}
  >
    <div className="w-full h-full transition-transform duration-300 ease-out transform group-hover:scale-110">
      {value === "X" && <IconX isWinner={isWinner} />}
      {value === "O" && <IconO isWinner={isWinner} />}
    </div>
  </button>
);

export function GameBoard({ board, onSquareClick, isGameOver, winningLine }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-auto p-2 rounded-xl bg-card/80 shadow-lg border-2 border-foreground/20 backdrop-blur-sm">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          disabled={isGameOver || value !== null}
          isWinner={winningLine?.includes(index) ?? false}
        />
      ))}
    </div>
  );
}
