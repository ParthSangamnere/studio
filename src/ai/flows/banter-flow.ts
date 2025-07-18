'use server';
/**
 * @fileOverview An AI agent that generates pirate-themed banter for a Tic-Tac-Toe game.
 *
 * - generateBanter - A function that generates a taunt from the perspective of a Marine opponent.
 * - BanterInput - The input type for the generateBanter function.
 * - BanterOutput - The return type for the generateBanter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit/zod';
import type { BoardState, GameStatus } from '@/lib/types';


const BanterInputSchema = z.object({
  playerName: z.string().describe("The name of the human player."),
  boardState: z.array(z.union([z.literal('X'), z.literal('O'), z.null()])).describe("The current 3x3 tic-tac-toe board state. 'X' is the player, 'O' is the AI (Marine)."),
  gameStatus: z.enum(['playing', 'win', 'loss', 'draw']).describe("The current status of the game from the player's perspective. 'win' means the player won, 'loss' means the AI won.")
});
export type BanterInput = z.infer<typeof BanterInputSchema>;

const BanterOutputSchema = z.object({
  banter: z.string().describe("A short, witty, or taunting remark from the Marine opponent. Max 15 words."),
});
export type BanterOutput = z.infer<typeof BanterOutputSchema>;

export async function generateBanter(input: BanterInput): Promise<BanterOutput> {
  return banterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'banterPrompt',
  input: {schema: BanterInputSchema},
  output: {schema: BanterOutputSchema},
  prompt: `You are a cocky Marine soldier in the world of One Piece playing Tic-Tac-Toe against a pirate. Your name is "Marine". The pirate's name is {{playerName}}.

The game board is represented by a 9-element array. 'X' is the pirate's symbol, and 'O' is your symbol (the Marine).
The board state is: {{jsonStringify boardState}}

The current game status is '{{gameStatus}}'.
- If the status is 'playing', the pirate has just made a move and it is now your turn.
- If the status is 'win', the pirate has just won.
- If the status is 'loss', you (the Marine) have just won.
- If the status is 'draw', the game is a draw.

Based on the current board and game status, generate a short, clever, in-character taunt or comment (max 15 words). Be creative and sound like a boastful Marine. Do not mention the board array in your response.

Examples:
- (Pirate is winning): "A lucky move, but justice will prevail!"
- (You are winning): "Ha! Is that all the fight you have in you, pirate scum?"
- (Game just started): "You're no match for the long arm of the law!"
- (You just won): "Another victory for the Marines! You're under arrest!"
- (Pirate just won): "Impossible! I demand a rematch in the name of the World Government!"
- (Draw): "A draw? You're only delaying the inevitable, {{playerName}}."

Now, generate your response.`,
});

const banterFlow = ai.defineFlow(
  {
    name: 'banterFlow',
    inputSchema: BanterInputSchema,
    outputSchema: BanterOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
