
$(() => {
  const tweetText = $("#tweet-text");
  tweetText.on("input", function (event) {
    let countVal = 140 - $(this).val().length;
    let formLowDiv = $(this).parent().children(".bottomTweet");
    formLowDiv.children(".counter").val(countVal);

    if (countVal < 0) {
      formLowDiv.children(".counter").css({ "color": "red" });
    } else {
      formLowDiv.children(".counter").css({ "color": "#545149" });
    }
  });

  //handles scroll to top button appearance and write button appearance
  $(document).scroll(() => {
    if ($(this).scrollTop() > 100) {
      $('.upArrow:hidden').stop(true, true).fadeIn();
      $('.rightNav:visible').stop(true, true).fadeOut();
    } else {
      $('.upArrow').stop(true, true).fadeOut();
      $('.rightNav').stop(true, true).fadeIn();
    }
  });

  $('#backToTop').click(() => {
    window.scrollTo(0, 0);
  });
});