Joel Al Gohri Sayed - W0514987
PROG2700 Assignment 2 - Part C: Poker Hands

AI note: I used AI to help me build and understand this. I went through every line and can explain how it works.

How to run
- Open index.html in a browser (or with Live Server in VS Code).
- It gets a new shuffled deck from the Deck of Cards API, draws 5 cards,
  shows the card pictures and names, and shows the best poker hand.

Testing links (open these from the project folder)
Each one loads a hand from my instructor's test API:
https://poker-hand-test-api.onrender.com/pokerhandtest/<name>
1.  Royal Flush:      index.html?test=royalflush
2.  Straight Flush:   index.html?test=straightflush
3.  Four of a Kind:   index.html?test=fourofakind
4.  Full House:       index.html?test=fullhouse
5.  Flush:            index.html?test=flush
6.  Straight:         index.html?test=straight
7.  Three of a Kind:  index.html?test=threeofakind
8.  Two Pair:         index.html?test=twopair
9.  One Pair:         index.html?test=onepair
10. High Card:        index.html?test=highcard
Random hand:          index.html
(The links are also listed at the bottom of the page.)
On a test link the Draw Again button is turned off, because the test hand
is not from a real deck. Click Random Hand to go back to a real deck.
The test API is on render.com, so the first load can take a little while.

Enhancements I picked (4)
1. Interactivity and Styling - "Draw Again" button, cards lift on hover,
   cards fade in, green table and button styling in style.css.
2. Sort Cards - "Sort by Suit" and "Sort by Value" buttons.
7. Theme Switcher - Dark/Light Mode button, saved in localStorage.
8. Card Count Tracker - shows "Cards Remaining", the Draw Again button turns
   off when there are not enough cards and shows "Deck is empty." at 0.

Sources
- Deck of Cards API docs: https://deckofcardsapi.com/
- Instructor's poker hand test API: https://poker-hand-test-api.onrender.com/pokerhandtest/
- Poker hand rankings: https://www.cardplayer.com/rules-of-poker/hand-rankings
- MDN fetch / async await: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- AI help as noted above. No other code samples were copied.
