const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
//show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
//Show New Quote
function newQuote() {
    loading();
  //Pick a Random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check If there is an author
  if (!quote.author) {
    authorText.textContent = "- " + "Unknown";
  } else {
    authorText.textContent = "- " + quote.author;
  }
  //Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
    quoteText.textContent = quote.text;
  } else {
    quoteText.classList.remove("long-quote");
    quoteText.textContent = quote.text;
  }
  complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();

  } catch (error) {
    //catch Error Here
    console.log(error)
  }
}
// Tweet a Quote
function tweetQuote(){
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent}  ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}
//Event Listener
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
//On Load
getQuotes();
