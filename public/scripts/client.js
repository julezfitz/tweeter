
const loadTweets = function () {
  $.get('/tweets', function (tweets, status) {
    renderTweets(tweets);
  });
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (data) {
  let timeStamp = timeago.format(data.created_at);

  const $tweet =
    $(`<article class="tweet">

 <header>
         <div class = "username-pic">
         <img class = "profile-pic" src = ${data.user.avatars}>
         <p>${escape(data.user.name)}</p>
         </div>
         <p class = "username">${escape(data.user.handle)}</p>
        </header> 

        <p class = "tweet-text">${escape(data.content.text)}</p>
        <hr>
        <footer>
          <p class = "time">${timeStamp}</p>
          <div class = "social">
            <i class="fas fa-solid fa-flag"></i>
            <i class="fas fa-solid fa-retweet"></i>
            <i class="fas fa-solid fa-heart"></i>
          </div>
        </footer>
 </article>`);

  return $tweet;
};

const renderTweets = function (tweetArray) {
  const tweetContain = $('.tweet-container');

  const reverseTweets = tweetArray.reverse();

  for (const key in reverseTweets) {
    let $tweet = createTweetElement(reverseTweets[key]);
    tweetContain.append($tweet);
  }
};

$(function () {
  loadTweets();

  $('.form').submit(function (event) {
    event.preventDefault();

    // if field is empty or exceeds character limit, alert errors
    if ($.trim($('#tweet-text').val()) === "") {
      alert("Please enter a tweet");
    } else if ($('#tweet-text').val().length > 140) {
      alert("Message too long! Please shorten your tweet");
    } else {

      const serializedTweet = $(this).serialize();
      $.ajax({
        url: "/tweets",
        type: "post",
        data: serializedTweet
      }).then(function () {
        //empty the form, delete all the tweets and reload them from /tweets
        $(".form")[0].reset();
        $('.tweet-container').empty();
        loadTweets();
      });
    }
  });
});
