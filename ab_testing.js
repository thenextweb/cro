// Variables
var testID = '001',
      testDays = 8,
      randomNumber = {{Random Number}},
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
  var date = new Date();
  date.setTime(date.getTime() + (testDays * 86400000));
  var expires = '; expires=' + date.toGMTString();
  document.cookie = 'tnw-' + testID + '=' + variantID + expires + '; path=/';
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

function checkCookie(name) {
  ca = document.cookie.split(';')

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(name) > -1) return true;
  }
  return false;
}

function sendDimension(variant) {
  if (checkCookie('_ga')) ga("set",'dimension10','tnw-' + testID + '-' + variant);
}

function control(testVariant) {
  setCookie(testID, testVariant, testDays);
  sendDimension(testVariant);
}

function variant(variantID) {
  control(variantID);
  if (variantID > 0) variants[variantID].execute();
}

// Check variants v.s. cookies
var variantsRandom = Math.round(2147483647 / (Object.keys(variants).length + 1));

if (testVariant) {
  variant(testVariant);
} else if (!checkCookie('tnw-')) {
  var chosen = 0;
  for (var j = 0; j <= 2147483647; j+= variantsRandom) {
    if (randomNumber <= variantsRandom) {
      variant(chosen);
      break;
    } else if (randomNumber >= j && randomNumber < (j + variantsRandom)) {
      variant(chosen);
      break;
    }
    chosen++;
  }
}