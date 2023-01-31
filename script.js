const quoteConatiner = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
// Get Quotes from API

// loader
const loading = () => {
  loader.hidden = false;
  quoteConatiner.hidden = true;
};

// hide loading
const complete = () => {
  quoteConatiner.hidden = false;
  loader.hidden = true;
};

// show new quotes
const newQuote = () => {
  loading();
  // random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //   check if author null
  !quote.author
    ? (authorText.textContent = "Unknow")
    : (authorText.textContent = quote.author);

  quote.text.length > 100
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // set Quote, hide loader
  quoteText.textContent = quote.text;
  complete();
};

const getQuotes = async () => {
  loading();

  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // error
  }
};

//  tweetQuote
const tweetQuote = () => {
  const twittterUrl = `https://twitter.com/intent/tweet? text=${quoteText.textContent} - ${authorText.authorContent}`;
  window.open(twittterUrl, "_blank");
};

// event listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// onLoad
getQuotes();
