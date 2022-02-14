$('.sub-menu ul').hide();

$(".sub-menu a").click(function () {
	$(this).parent(".sub-menu").children("ul").slideToggle("100");
 $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
});

$("#navHamburger").click(function () {
  $('#wb-sec').slideToggle("100");
  $(this).children('span').toggleClass('fa-solid fa-xmark')
});

let hamNav = document.querySelector("#navHamburger")

hamNav.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

