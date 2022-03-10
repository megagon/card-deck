import { ElementType } from "./helpersTypes";

export const suits = [ 'SPADES' , 'CLUBS' , 'HEARTS' , 'DIAMONDS' ] as const;
export type Suits = ElementType<typeof suits>;
export const suitsCodes = [ 'S' , 'C' , 'H' , 'D' ] as const;
export type SuitsCodes = ElementType<typeof suitsCodes >;
export const valuesDigits = [ '2' ,  '3' , '4' , '5' , '6' , '7' , '8' , '9' , '10' ] as const;
export type ValuesDigits = ElementType<typeof valuesDigits >;
export const valuesPictures = [ 'JACK' , 'QUEEN' , 'KING' , 'ACE' ] as const;
export type ValuesPictures = ElementType<typeof valuesPictures >;
export const valuesPicturesCodes = [ 'J' , 'Q' , 'K' , 'A' ] as const;
export const values = [...valuesDigits, ...valuesPictures] as const;
export type Values = ElementType<typeof values >;
export type ValuesPicturesCodes = ElementType<typeof valuesPicturesCodes >;
export type ValuesCodes = ValuesDigits | ValuesPicturesCodes;
export type Codes = `${ValuesCodes}${SuitsCodes}`;
export type DeckType = 'SHORT' | 'FULL';
export type Deck = {
  cards: Card[],
  deckId: string,
  type: DeckType,
  remaining: number
  shuffled: boolean,
}
export const deckTypeExcludes: Record<DeckType, Values[]> = {
  SHORT: ['2', '3', '4', '5'],
  FULL: []
}

export type Card = {
  value: Values,
  code: Codes,
  suit: Suits,
}
