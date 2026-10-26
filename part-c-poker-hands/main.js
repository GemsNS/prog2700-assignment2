// Joel Al Gohri Sayed - W0514987
// PROG2700 Assignment 2 - Part C: Poker Hands
// This app gets a shuffled deck from the Deck of Cards API, draws 5 cards,
// shows them on the page and tells you the best poker hand.
// AI note: I used AI to help me build and understand this. I went through every line and can explain how it works.

// i wrap everything in an IIFE so none of my variables end up in the global scope (window)
(function () {

  // these hold my data from the API
  let deckId = "";      // the id of my deck
  let cards = [];       // the 5 cards in my hand
  let remaining = 0;    // how many cards are left in the deck

  // ---- POKER CHECKS START ----

  // turn one card value into a number so i can compare them
  function getValueNumber(value) {
    if (value === "ACE") {
      return 14;
    }
    if (value === "KING") {
      return 13;
    }
    if (value === "QUEEN") {
      return 12;
    }
    if (value === "JACK") {
      return 11;
    }
    // the API uses "0" in the card code for a ten, so i check that too
    if (value === "10" || value === "0") {
      return 10;
    }
    // 2 to 9 are already numbers, i just change the text to a number
    return Number(value);
  }

  // make a list of the 5 value numbers, sorted from low to high
  function getValueNumbers(hand) {
    let numbers = [];
    for (let i = 0; i < hand.length; i++) {
      numbers.push(getValueNumber(hand[i].value));
    }
    numbers.sort(function (a, b) {
      return a - b;
    });
    return numbers;
  }

  // count how many of each value i have
  // example: three kings and two 3s gives { 13: 3, 3: 2 }
  function countValues(hand) {
    let counts = {};
    let numbers = getValueNumbers(hand);
    for (let i = 0; i < numbers.length; i++) {
      let number = numbers[i];
      if (counts[number] === undefined) {
        counts[number] = 1;
      } else {
        counts[number] = counts[number] + 1;
      }
    }
    return counts;
  }

  // put just the counts in a list, biggest first
  // example: { 13: 3, 3: 2 } gives [3, 2]
  function getCountList(hand) {
    let counts = countValues(hand);
    let countList = [];
    for (let number in counts) {
      countList.push(counts[number]);
    }
    countList.sort(function (a, b) {
      return b - a;
    });
    return countList;
  }

  // a flush is when all 5 cards have the same suit
  // i compare every card's suit to the first card's suit
  function isFlush(hand) {
    let firstSuit = hand[0].suit;
    for (let i = 1; i < hand.length; i++) {
      if (hand[i].suit !== firstSuit) {
        return false;
      }
    }
    return true;
  }

  // a straight is 5 values in a row, like 5 6 7 8 9
  function isStraight(hand) {
    let numbers = getValueNumbers(hand);

    // special case: A 2 3 4 5 is a straight too (the ace counts as 1)
    if (numbers[0] === 2 && numbers[1] === 3 && numbers[2] === 4 &&
        numbers[3] === 5 && numbers[4] === 14) {
      return true;
    }

    // the numbers are sorted, so each one has to be exactly 1 more than the one before it
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== numbers[i - 1] + 1) {
        return false;
      }
    }
    return true;
  }

  // a royal flush is a straight flush that goes 10 J Q K A
  function isRoyalFlush(hand) {
    let numbers = getValueNumbers(hand);
    return isFlush(hand) && isStraight(hand) && numbers[0] === 10;
  }

  // a straight flush is a straight where all the cards are the same suit
  function isStraightFlush(hand) {
    return isFlush(hand) && isStraight(hand);
  }

  // four cards with the same value
  function isFourOfAKind(hand) {
    let countList = getCountList(hand);
    return countList[0] === 4;
  }

  // three of one value and two of another
  function isFullHouse(hand) {
    let countList = getCountList(hand);
    return countList[0] === 3 && countList[1] === 2;
  }

  // three cards with the same value (and the other two are different)
  function isThreeOfAKind(hand) {
    let countList = getCountList(hand);
    return countList[0] === 3 && countList[1] === 1;
  }

  // two different pairs
  function isTwoPair(hand) {
    let countList = getCountList(hand);
    return countList[0] === 2 && countList[1] === 2;
  }

  // just one pair
  function isOnePair(hand) {
    let countList = getCountList(hand);
    return countList[0] === 2 && countList[1] === 1;
  }

  // check from the best hand down to the worst and return the first one that matches
  function getHandName(hand) {
    if (isRoyalFlush(hand)) {
      return "Royal Flush";
    }
    if (isStraightFlush(hand)) {
      return "Straight Flush";
    }
    if (isFourOfAKind(hand)) {
      return "Four of a Kind";
    }
    if (isFullHouse(hand)) {
      return "Full House";
    }
    if (isFlush(hand)) {
      return "Flush";
    }
    if (isStraight(hand)) {
      return "Straight";
    }
    if (isThreeOfAKind(hand)) {
      return "Three of a Kind";
    }
    if (isTwoPair(hand)) {
      return "Two Pair";
    }
    if (isOnePair(hand)) {
      return "One Pair";
    }
    return "High Card";
  }

  // ---- POKER CHECKS END ----

  // show my 5 cards on the page
  function showHand() {
    let names = [];
    for (let i = 0; i < cards.length; i++) {
      // grab the img tag (card1 to card5) and set its picture
      let img = document.getElementById("card" + (i + 1));
      img.src = cards[i].image;
      img.alt = cards[i].value + " of " + cards[i].suit;
      names.push(cards[i].value + " of " + cards[i].suit);
    }
    // write the card names and the poker hand name on the page
    document.getElementById("cardNames").textContent = names.join(", ");
    document.getElementById("handName").textContent = getHandName(cards);
  }

  // show how many cards are left and turn off the draw button when there aren't enough
  function showRemaining() {
    document.getElementById("remaining").textContent = "Cards Remaining: " + remaining;
    let drawButton = document.getElementById("drawButton");
    let message = document.getElementById("message");

    if (remaining === 0) {
      drawButton.disabled = true;
      message.textContent = "Deck is empty.";
    } else if (remaining < 5) {
      drawButton.disabled = true;
      message.textContent = "Not enough cards left for a new hand. Reload the page for a new deck.";
    } else {
      drawButton.disabled = false;
      message.textContent = "";
    }
  }

  // get a new shuffled deck from the API and save the deck id
  async function getDeck() {
    let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    let response = await fetch(url);
    let data = await response.json();
    deckId = data.deck_id;
    remaining = data.remaining;
  }

  // get a test hand from my instructor's test API (example: index.html?test=royalflush)
  // it sends back 5 cards shaped just like a draw from the Deck of Cards API
  async function getTestHand(testName) {
    let url = "https://poker-hand-test-api.onrender.com/pokerhandtest/" + testName;
    let response = await fetch(url);
    let data = await response.json();
    cards = data.cards;
    showHand();

    // a test hand isn't from my real deck, so i turn off Draw Again
    document.getElementById("remaining").textContent = "Test hand: " + testName;
    document.getElementById("drawButton").disabled = true;
    document.getElementById("message").textContent = "Click Random Hand to go back to a real deck.";
  }

  // draw 5 cards from my deck, save them and show them
  async function drawHand() {
    let url = "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=5";
    let response = await fetch(url);
    let data = await response.json();
    cards = data.cards;
    remaining = data.remaining;
    showHand();
    showRemaining();
  }

  // sort my cards by suit (clubs, diamonds, hearts, spades) and show them again
  function sortBySuit() {
    cards.sort(function (a, b) {
      if (a.suit < b.suit) {
        return -1;
      }
      if (a.suit > b.suit) {
        return 1;
      }
      return 0;
    });
    showHand();
  }

  // sort my cards from lowest value to highest and show them again
  function sortByValue() {
    cards.sort(function (a, b) {
      return getValueNumber(a.value) - getValueNumber(b.value);
    });
    showHand();
  }

  // switch between light and dark mode and remember it in localStorage
  function toggleTheme() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    updateThemeButton();
  }

  // change the theme button text to match the theme
  function updateThemeButton() {
    let button = document.getElementById("themeButton");
    if (document.body.classList.contains("dark")) {
      button.textContent = "Light Mode";
    } else {
      button.textContent = "Dark Mode";
    }
  }

  // load the theme i saved last time
  function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }
    updateThemeButton();
  }

  // start the app: hook up the buttons, get a deck, then draw my first hand
  async function start() {
    loadTheme();
    document.getElementById("drawButton").addEventListener("click", drawHand);
    document.getElementById("sortSuitButton").addEventListener("click", sortBySuit);
    document.getElementById("sortValueButton").addEventListener("click", sortByValue);
    document.getElementById("themeButton").addEventListener("click", toggleTheme);

    // if the page link has ?test=... i load that test hand, if not i use a real deck
    let params = new URLSearchParams(window.location.search);
    let testName = params.get("test");

    try {
      if (testName) {
        await getTestHand(testName);
      } else {
        await getDeck();
        await drawHand();
      }
    } catch (error) {
      // if the API doesn't answer, show a message instead of breaking
      document.getElementById("cardNames").textContent = "Could not load cards from the API.";
      console.log(error);
    }
  }

  start();

})();
