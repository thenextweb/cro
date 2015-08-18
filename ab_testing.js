// Variables
var testID = '001',
    testDays = 8,
    randomNumber = {{Randon Number}},
    testVariant = readCookie(testID),
    variants = {
      1: {
        execute: function() {
          //
        }
      },
      2: {
        execute: function() {
          //
        }
      }
    };

// Helpers
function setCookie(testID, variantID, testDays) {
  if (typeof(testDays)==='undefined') testDays = 8;
  var date = new Date();
  date.setTime(date.getTime() + (testDays * 86400000));
  var expires = '; expires=' + date.toGMTString();
  document.cookie = 'tnw-' + testID + '=' + testID + '-' + variantID + expires + '; path=/';
}

function readCookie(testID) {
  var nameEQ = 'tnw-' + testID + '=',
      ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function inTest() {
  ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf("tnw") > -1) return true;
  }
  return false;
}

function sendDimension(variant) {
  ga("set",'dimension10','tnw-' + testID + '-' + variant);
}

function control(testVariant) {
  setCookie(testID, testVariant, testDays);
  sendDimension(testVariant);
}

function variant(variantID) {
  control(variantID);
  if(variantID > 0) variants[variantID].execute();
}

// Check variants v.s. cookies
if(testVariant) {
  for (var i = 0; i <= Object.keys(variants).length; i++) {
    if(testVariant == testID + '-' + i) variant(i);
  }
} else if(!inTest()) {
  var chosen = 0;
  for (var j = 0; j <= 2147483647; j+= Math.round(2147483647 / (Object.keys(variants).length + 1))) {
    if(randomNumber <= Math.round(2147483647 / (Object.keys(variants).length) + 1)) {
      variant(chosen);
      break;
    } else if(randomNumber >= j && randomNumber < j + Math.round(2147483647 / (Object.keys(variants).length + 1)) ) {
      variant(chosen);
      break;
    }
    chosen++;
  }
}