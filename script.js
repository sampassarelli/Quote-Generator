const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
let apiQuotes = []

// Show Loading
function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

//  Hide Loading
function removeLoadingSpinner() {
  quoteContainer.hidden = false
  loader.hidden = true
}

// Show New Quote
function newQuote() {
  showLoadingSpinner()
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  // Check if author field is blank and replace it with unknown
  quote.author ? authorText.textContent = quote.author : authorText.textContent = "Unknown"
  // Check Quote Length to determine the styling 
  quote.text.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
  // Set quote and hide loader
  quoteText.textContent = quote.text
  removeLoadingSpinner()
}

// Get Quote From API
async function getQuotes() {
  showLoadingSpinner()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    // Catch Error Here 
    alert("There was an error loading the quote")
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners 
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load 
getQuotes()
