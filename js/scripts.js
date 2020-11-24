
let quotesData;

var currentQuote = '',
  currentAuthor = '';


function getQuotes() {
  
  const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
  return $.ajax({
    type: 'GET',
    url: url,
    headers: {
      Accept: 'application/json'
    },
    success: function(data) {
      if(typeof data === 'string') {
        quotesData = JSON.parse(data);
      }
    }
  });
};

function getQuote() {

  let randomQuote = quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $('#quote-text').animate({opacity: 0}, 300, function() {
    $(this).animate({opacity:1}, 300);
    $('#text').text(currentQuote);
  });

  $('#quote-author').animate({opacity: 0}, 300, function() {
    $(this).animate({opacity: 1}, 300);
    $('#author').html(currentAuthor);
  })
};

$(document).ready(function() {
  getQuotes().then(() => {
    getQuote();
  });
  
  $('#new-quote').on('click', getQuote);
});
