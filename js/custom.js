$('.sub-menu ul').hide();

$(".sub-menu div").click(function () {
  $(this).parent(".sub-menu").children("ul").slideToggle("100");
  $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");

  // return false prevents page from reloading when clicking empty link
  var href = $(this).attr('href');
  if (href == "#"){
    return false
  }
});

$(".sub-menu a").click(function () {
  $(this).parent(".sub-menu").children("ul").slideToggle("100");
  $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");

  // return false prevents page from reloading when clicking empty link
  var href = $(this).attr('href');
  if (href == "#"){
    return false
  }
});

// Hamburger menu for mobile mode
$("#navHamburger").click(function () {
  $('#wb-sec').slideToggle("100");
  $(this).children('span').toggleClass('fa-solid fa-xmark')
  // return false prevents page from reloading
  return false
});


//Expand collapse the nav in mobile/tablet views
let hamNav = document.querySelector("#navHamburger")

hamNav.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

// Check for any active classes
var activeNav = document.getElementsByClassName("active")

if (activeNav.length > 0) {
  $(activeNav[0]).parents(".sub-menu").children("ul").slideToggle("100");
  $(activeNav[0]).parents(".sub-menu").find(".right").toggleClass("fa-caret-up fa-caret-down");
}