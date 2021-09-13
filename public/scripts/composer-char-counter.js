
$(function () {
  const tweetText = $("#tweet-text");
  tweetText.on("input", function (event) {
    let countVal = 140 - $(this).val().length;
    let formLowDiv = $(this).parent().children(".bottomTweet");
    formLowDiv.children(".counter").val(countVal);

    if (countVal < 0) {
      formLowDiv.children(".counter").css({ "color": "red" });
    } else {
      formLowDiv.children(".counter").css({ "color": #545149 });
    }
  });
});