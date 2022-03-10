import { v4 as uuid } from 'uuid';
import { DeckModel } from './models/deck';
import {  Codes, Deck, DeckType, deckTypeExcludes, suits, values} from "./types/deck";

export const createDeck = async (type: DeckType, shuffled: string) => {
  const deck: Deck = {
    deckId: uuid(),
    cards: [],
    remaining: 0,
    type,
    shuffled: shuffled === 'true',
  };
  suits.forEach(suit => {
    values.forEach(value => {
      if (!deckTypeExcludes[type].includes(value)) deck.cards.push({value, suit, code: `${value[0]}${suit[0]}` as Codes})
    })
  })
  deck.remaining = deck.cards.length;
  await (new DeckModel(shuffled === 'true' ? {...shuffleDeck(deck)} : {...deck})).save();
  delete deck.cards;
  return deck;
}

export const shuffleDeck = (deck: Deck) => {
  const copy = {...deck}
  copy.cards = copy.cards.map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
  return copy;
}

export const openDeck = (uuid: string) => {
  return DeckModel.findOne({deckId: uuid}, {_id: 0})
}

export const drawCard = async (uuid: string, amount: number) => {
  const deck = await DeckModel.findOne({deckId: uuid});
  const drew = deck.cards.splice(0, amount)
  if (amount > deck.remaining) throw new Error('draw error')
  deck.remaining = deck.remaining - amount;
  await deck.save();
  return {cards: drew};
}

export const shuffle = async (uuid: string) => {
  const deck = await DeckModel.findOne({deckId: uuid}).lean();
  const shuffled = shuffleDeck(deck);
  deck.cards = shuffled.cards;
  deck.shuffled = true;
  await DeckModel.updateOne({deckId: uuid}, deck);
  return true;
}
