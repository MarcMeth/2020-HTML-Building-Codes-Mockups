/*

 @version 1.0.0
 @authors Marc-Andre Methot
 @copyright © 2021 National Research Council of Canada.  All rights reserved.

 Disclaimer:
 This software is supplied "as is". Her Majesty the Queen in Right of Canada
 as represented by the Minister of Industry (“Canada”) makes no
 representations or warranties, express or implied, of any kind whatsoever,
 and assumes no liability for the accuracy, completeness, or usefulness of
 the software. Canada does not assume any liability in respect of any damages
 or losses arising out of or in connection with these use, or inability to u,
 the software.
 For the complete complete list of terms and conditions for NRC's web site,
 please refer to http://www.nrc-cnrc.gc.ca/eng/notices/index.html.

 Avertissement :
 Ce logiciel est fourni « tel quel ». Sa Majesté la reine du chef du Canada,
 représentée par le Ministre de l’Industrie (« Canada» ) ne fait aucune
 représentation ni ne donne aucune garantie, expresse ou implicite de quelque
 nature que ce soit et n’assume aucune responsabilité concernant l’exactitude,
 l’exhaustivité ou l’utilité du logiciel.   Le Canada n’assume aucune
 responsabilité vis-à-vis des dommages ou pertes résultant de l’utilisation
 ou de l’impossibilité d’utilisation du logiciel.
 Pour obtenir une liste complète des termes et conditions du site Web du
 CNRC, visitez http://zone.nrc-cnrc.gc.ca/notices_f.html

 */

	//
	// Variables
	//

var typeTimeout = null
var lang = document.documentElement.lang;
var myIframe = document.getElementById('iaContent');
var toc = document.getElementById('expList');
var totalEntries = document.querySelector('#expList').getElementsByTagName('li').length;

  //
	// Methods
	//

function getParents(element) {
  var parents = [];
  while (element.parentNode && element.parentNode.nodeName.toLowerCase() != 'div') {
    element = element.parentNode;
    parents.push(element);
  }
  return parents;
}

function displayParents(item) {
  var parents = getParents(item)
  for (var j = 0; j < parents.length; j++) {
    parents[j].classList.remove("hidden");
  }
}

function iframeFocus() {
  var element = myIframe.contentWindow.document.getElementsByTagName("H1")[0];
  element.tabIndex = -1;
  element.focus();
}

function updateFilterEntries() {
  // Variables used for the info found below the filter input box (e.g. Showing 1 to 6904 of 6904 entries)
  var tocInfo = document.getElementById("tocInfo");
  var foundEntries = (totalEntries) - (document.querySelector('#expList').getElementsByClassName('hidden').length);
  var foundNum = (foundEntries === 0) ? "0" : "1";

  switch (lang) {
    case "en":
      var text = "Showing " + foundNum + " to " + foundEntries + " of " + totalEntries + " entries"
      break;
    case "fr":
      var text = "Affiche " + foundNum + " à " + foundEntries + " de " + totalEntries + " entrées"
      break;
  }
  tocInfo.textContent = text
}

// Thottle the keypresses to only excute after 400ms has passed since last keypress 
const throttleFilter = function () {
  clearTimeout(typeTimeout);
  typeTimeout = setTimeout(applyfilter, 400) // Will apply the filter if no key is pressed for 400ms
}

const applyfilter = function () {

  // Variables used for filtering
  var input = document.querySelector('#filter');
  var items = document.querySelector('#expList').getElementsByTagName('li');
  var text = input.value.replace(/(?=[() ])/g, '\\');
  var pattern = new RegExp(text, 'i');

  // Loop over all <li> elements to filter out entries that do not match
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    // If text from filter input is found
    if (pattern.test(item.childNodes[0].nodeValue)) {
      // Get all child elements and parents on the element where the match was found
      var children = item.lastElementChild.querySelectorAll("li");
      // Element is displayed
      item.classList.remove("hidden");
      // Loop over all child elements and show
      for (var j = 0; j < children.length; j++) {
        children[j].classList.remove("hidden");
        i++
      }
      // Loop over all parent elements until div and show
      displayParents(item);
      // Check if it's the last child element// if it is and has a match show it and all parents
    } else if (pattern.test(item.innerText) && item.lastElementChild.querySelectorAll("li").length == 0) {
      item.classList.remove("hidden");
      // Loop over all parent elements until div and show
      displayParents(item);
      // If text from filter input is not found
    } else {
      // Hide the element as no match was found
      item.classList.add("hidden");
    }
  }
  updateFilterEntries();
}

  //
	// Inits & Event Listeners
	//

$('#filterDiv').removeClass('hidden');

// Set focus to first H1 when a link is clicked inside the TOC
toc.addEventListener('click', function (e) {
  const isParentLi = e.target.parentElement.nodeName === 'LI';
  if (!isParentLi) {
    return;
  }
  // Wait for frame to load before h1 is focused on
  setTimeout(iframeFocus, 500);
});

// Execute function everytime key is pressed within the filter search input
document.getElementById('filter').addEventListener('input', function (e) {
  throttleFilter();
})

//TEMPORARILY DEACTIVATED 
// Everytime the iframe loads the following event listener will highlight the matching location in the nav
// myIframe.addEventListener('load', function (e) {

//   var link = myIframe.contentWindow.location.href.split('#')[0];
//   var links = toc.getElementsByTagName("a");

//   for (var i = 0; i < links.length; i++) {
//     if (links[i].href === link) {
//       var activeElement = document.getElementsByClassName("active")
//       if (activeElement.length > 0) {
//         activeElement[0].classList.remove("activeTocLink");
//         activeElement[0].classList.remove("active");
//       }
//       links[i].classList.add("activeTocLink", "active");
//       links[i].classList.add("active");
//       return;
//     }
//   }
// });

// Hides the filter in wet4 basic HTML mode
document.addEventListener("DOMContentLoaded", function() {
 updateFilterEntries();
  setInterval(function () {
    // Checks if basic html is not enabled
    if (localStorage.getItem("wbdisable") === "true") {
      // Now checks if javascript is enabled show the filter after iframe is loaded
      document.getElementById("filterDiv").classList.add("hidden");
	  
    }
  }, 2000);
});

document.getElementById("filterDiv").addEventListener('keypress', function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                return false;
            }           
        });