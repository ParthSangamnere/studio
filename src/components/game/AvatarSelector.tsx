
"use client";

import { useState } from 'react';
import type { Character, GameMode } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

interface AvatarSelectorProps {
  characters: Character[];
  onSelect: (p1?: Character, p2?: Character) => void;
  mode: GameMode;
  player1Name: string;
}

export function AvatarSelector({ characters, onSelect, mode, player1Name }: AvatarSelectorProps) {
  const [player1Selection, setPlayer1Selection] = useState<Character | null>(null);
  const [player2Selection, setPlayer2Selection] = useState<Character | null>(null);

  const handleCharacterClick = (char: Character) => {
    if (mode === 'cpu') {
      setPlayer1Selection(char);
    } else if (mode === '1v1') {
      if (!player1Selection) {
        setPlayer1Selection(char);
      } else if (!player2Selection && char.id !== player1Selection.id) {
        setPlayer2Selection(char);
      }
    }
  };

  const getTitle = () => {
    if (mode === 'cpu') return 'Choose Your Character';
    if (!player1Selection) return `${player1Name}, Choose Your Character`;
    return `Player 2, Choose Your Character`;
  };

  const getAvailableCharacters = () => {
    if (mode === '1v1' && player1Selection) {
      return characters.filter(c => c.id !== player1Selection.id);
    }
    return characters;
  };

  const handleConfirm = () => {
    if (mode === 'cpu' && player1Selection) {
      onSelect(player1Selection);
    }
    if (mode === '1v1' && player1Selection && player2Selection) {
      onSelect(player1Selection, player2Selection);
    }
  };
  
  const isConfirmDisabled = () => {
    if (mode === 'cpu') return !player1Selection;
    if (mode === '1v1') return !player1Selection || !player2Selection;
    return true;
  }

  return (
    <Dialog open={true}>
      <DialogContent className="bg-card border-border sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-center">{getTitle()}</DialogTitle>
          <DialogDescription className="text-center">Select your pirate crew!</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          {getAvailableCharacters().map(char => (
            <Card
              key={char.id}
              onClick={() => handleCharacterClick(char)}
              className={cn(
                "cursor-pointer transition-all hover:border-primary hover:scale-105",
                (player1Selection?.id === char.id || player2Selection?.id === char.id) && "border-primary ring-2 ring-primary"
              )}
            >
              <CardContent className="p-2 flex flex-col items-center gap-2">
                <Image src={char.avatarUrl} alt={char.name} width={80} height={80} className="rounded-md" />
                <p className="font-body font-bold text-center">{char.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm} disabled={isConfirmDisabled()} size="lg">
            Confirm Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    