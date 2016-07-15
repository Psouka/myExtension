$(function() {
  var s = 0;
  
  $('#sidebar .arrow-box').click(function() {
    if (s == 0) {
      s = 1;
      $('#sidebar').css('left', '-200px');
      $('#sidebar .arrow').removeClass('dir-one');
      $('#sidebar .arrow').addClass('dir-two');
      $('#content').css('padding-left', '0');
    } else {
      s = 0;
      $('#sidebar').css('left', '0');
      $('#sidebar .arrow').addClass('dir-one');
      $('#sidebar .arrow').removeClass('dir-two');
      $('#content').css('padding-left', '200px');
    }
  });
});