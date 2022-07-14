$('.sub-menu ul').hide();

$(".sub-menu div").click(function () {
  $(this).parent(".sub-menu").children("ul").slideToggle("100");
  $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");

  // return false prevents page from reloading when clicking empty link
  var href = $(this).attr('href');
  if (href == "#") {
    return false
  }
});

$(".sub-menu button").click(function () {
  $(this).parent(".sub-menu").children("ul").slideToggle("100");
  $(this).toggleClass("fa-caret-up fa-caret-down");

  // return false prevents page from reloading when clicking empty link
  var href = $(this).attr('href');
  if (href == "#") {
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

hamNav.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

//// Color of the button icon needs to be inverted when navigating with a keyboard in order to meet color contrast accessibility (from dark to light - dark blue to white)
// Get all nav list items from the left handed navs
let boxes1 = Array.from(document.getElementsByClassName('left-nav'));
// Get all buttons from the navs
let boxes2 = Array.from(document.getElementsByClassName('btn-submenu'));

// Combine all of them in one array
let boxes = boxes1.concat(boxes2)

// Loop over them all and add focusin/focusout event listeners to them
boxes.forEach(box => {
  box.addEventListener('focusin', event => {
    console.log("Mouse in");
    // Check if the element is a button
    if (box.nodeName == "BUTTON") {
      box.setAttribute('style', 'color: white;');
    // If it's a button and the nextsibling exist then we need to have it's color changed to white. 
    } else if (box.nextElementSibling !== null) {
       box.nextElementSibling.setAttribute('style', 'color: white;');
    } 
  }); 

  // Same thing as above but for the focusout event
  box.addEventListener('focusout', event => {
    console.log("Mouse out");
    if (box.nodeName == "BUTTON" && box.previousElementSibling.className.match("active") == null) {
      box.setAttribute('style', 'color: none;');
    } else if (box.nextElementSibling !== null) {
       box.nextElementSibling.setAttribute('style', 'color: none;');
    } 
  });
});

// Check for any active classes
// Find active nav element, if any exist, change the color scheme for the button and slide toggle it's children and parents.
let docNav = document.getElementsByClassName("doc-nav");
let activeDocNav = docNav[0].querySelector('.active')

let test = $(activeDocNav).parents(".sub-menu")

$(activeDocNav).parents(".sub-menu").children("ul").slideToggle("100");
$(activeDocNav).parents(".sub-menu").find(".btn-submenu:first").toggleClass("fa-caret-up fa-caret-down");

if (activeDocNav.nodeName == "BUTTON") {
  activeDocNav.setAttribute('style', 'color: white;');
} else if (activeDocNav.nextElementSibling !== null) {
  activeDocNav.nextElementSibling.setAttribute('style', 'color: white;');
}