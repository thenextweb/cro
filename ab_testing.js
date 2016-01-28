// Variables
var testID = '001',
      testDays = 8,
      randomNumber = {{Random Number}},
      testVariant = readCookie(testID),
      previewUrl = true,
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

/**
 * @description Sets a cookie
 */
function setCookie(testID, variantID, testDays) {
  var date = new Date();
  date.setTime(date.getTime() + (testDays * 86400000));
  var expires = '; expires=' + date.toGMTString();
  document.cookie = 'tnw-' + testID + '=' + variantID + expires + '; path=/';
}

/**
 * @param {{string}} testID
 * @returns null
 */
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

/**
 * @param {string} name
 * @returns {boolean} false
 */
function checkCookie(name) {
  ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(name) > -1) return true;
  }
  return false;
}

/**
 * @param variant
 */
function sendDimension(variant) {
  if (checkCookie('_ga')) ga("set",'dimension10','tnw-' + testID + '-' + variant);
}


/**
 * @param name
 */
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null) {
    return "";
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}

/**
 * @param testVariant
 */
function control(testVariant) {
  setCookie(testID, testVariant, testDays);
  sendDimension(testVariant);
}

/**
 * @param variantID
 */
function variant(variantID) {
  control(variantID);
  if (variantID > 0) variants[variantID].execute();
}

// Check variants v.s. cookies
var variantsRandom = Math.round(2147483647 / (Object.keys(variants).length + 1));

if(previewUrl && getParameterByName('previewUrl') != "") {
  variant(getParameterByName('previewUrl'));
} else if (testVariant) {
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