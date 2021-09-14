
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

const errorMessage = function (error) {
  const $error =
    $(`<div class="errorMessages">
  <i class="fas fa-exclamation-circle"></i>
  <p>${error}</p>
  </div>`);
  return $error;
};

$(() => {
  loadTweets();

  $('.form').submit(function (event) {
    event.preventDefault();

    // if field is empty or exceeds character limit, display errors
    const errorDiv = $('.error');

    //clear an error message if one is already displayed
    if ($('.errorMessages')) {
      $('.error').hide();
      errorDiv.empty();
    };

    if ($.trim($('#tweet-text').val()) === "") {
      errorDiv.append(errorMessage("Please enter a tweet"));
      $('.error').slideDown("fast");
    } else if ($('#tweet-text').val().length > 140) {
      errorDiv.append(errorMessage("Message too long! Please shorten your tweet"));
      $('.error').slideDown("fast");
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
        $('.error').hide();
        errorDiv.empty();
        loadTweets();
      });
    }
  });
});
