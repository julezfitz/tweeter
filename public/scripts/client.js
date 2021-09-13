
$(function () {
  const render = document.querySelector('.need_to_be_rendered');
  const time = timeago.format(new Date());
  render.innerHTML += time;
});