
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};

const createTweetElement = function(data) {
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

  const tweetContain = $('.tweet-container');

  return tweetContain.append($tweet);
};

$(function () {

  let tweetButton = $('.tweetButton');
  createTweetElement(tweetData);
});
