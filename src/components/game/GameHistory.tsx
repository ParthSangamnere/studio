"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { HistoryEntry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

interface GameHistoryProps {
  history: HistoryEntry[];
}

export function GameHistory({ history }: GameHistoryProps) {
  if (!history || history.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No games played yet. Let's change that!
      </div>
    );
  }

  return (
    <ScrollArea className="h-96 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Opponent</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="text-right">Points</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((game) => (
            <TableRow key={game.id}>
              <TableCell className="font-medium">{game.opponent}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn({
                    "border-accent text-accent": game.result === "win",
                    "border-destructive text-destructive": game.result === "loss",
                    "border-muted-foreground text-muted-foreground": game.result === "draw",
                  })}
                >
                  {game.result}
                </Badge>
              </TableCell>
              <TableCell
                className={cn("text-right font-mono", {
                  "text-accent": game.points > 0,
                  "text-destructive": game.points < 0,
                })}
              >
                {game.points > 0 ? `+${game.points}` : game.points}
              </TableCell>
              <TableCell>{game.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
