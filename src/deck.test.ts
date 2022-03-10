// @ts-nocheck
import { shuffleDeck } from './deck';
test('deck should be shuffled', () => {
  const deck = {
    cards: ['1', '2', '3']
  }
  const shuffled = shuffleDeck(deck);
    expect(shuffled[0]).not.toBe('1');
  });
