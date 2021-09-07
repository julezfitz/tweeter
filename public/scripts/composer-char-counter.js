
$(document).ready(function () {
  const tweetText = document.getElementById("tweet-text");
  tweetText.addEventListener("input", function (event) {
    let countVal = 140 - $(this).val().length;
    //let form = $(this).parent();
    let formLowDiv = $(this).parent().children(".bottomTweet");
    formLowDiv.children(".counter").val(countVal);

    if (countVal < 0) {
      formLowDiv.children(".counter").css({ "color": "red" });
    }
  });
});