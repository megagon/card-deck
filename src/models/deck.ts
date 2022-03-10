import mongoose from "mongoose";
import { Deck } from "../types/deck";

const deckSchema = new mongoose.Schema<Deck>({
  deckId: String,  
  type: String,
  shuffled: Boolean,
  remaining: Number,
  cards: Array,
});

export const DeckModel = mongoose.model('Deck', deckSchema);
