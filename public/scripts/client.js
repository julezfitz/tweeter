
const loadTweets = function () {
  $.get('/tweets', function (tweets, status) {
    renderTweets(tweets);
  });
};

const createTweetElement = function (data) {
  let timeStamp = timeago.format(data.created_at);

  const $tweet =
    $(`<article class="tweet">

 <header>
         <div class = "username-pic">
         <img class = "profile-pic" src = ${data.user.avatars}>
         <p>${data.user.name}</p>
         </div>
         <p class = "username">${data.user.handle}</p>
        </header> 

        <p class = "tweet-text">${data.content.text}</p>
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
  for (const key in tweetArray) {
    let $tweet = createTweetElement(tweetArray[key]);
    tweetContain.append($tweet);
  }
};

$(function () {
  const tweetButton = $('.tweetButton');
  //$(tweetButton).click()
  loadTweets();

  $('.form').submit(function (event) {
    event.preventDefault();
    const serializedTweet = $(this).serialize();

    request = $.ajax({
      url: "/tweets",
      type: "post",
      data: serializedTweet
    });

    //empty the form, delete all the tweets and reload them from /tweets
    $(".form")[0].reset();
    $('.tweet-container').empty();
    loadTweets();
  });
});
