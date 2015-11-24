# A/B Testing with Google Tag Manager
Scripts that support A/B/n + Multivariate Testing (for [The Next Web]
(http://thenextweb.com)), via [Google Tag Manager](http://tagmanager.google.com).

Features
--------
* Supports: A/B testing and Multivariate testing.
* Integration with Google Analytics, will send data for variants to custom dimensions.
* Supported via Google Tag Manager but also easily configurable to run natively.

<hr />

## Usage
Both scripts work in a similar order and require the use of Google Tag Manager
to make sure it will work. You can add a new tag there to make sure your
variants are working.

* `testID` - the id for your test.
* `testDays` - the number of days you'd like to run the test.
* `randomNumber` - the randon number variable used in Google Tag Manager. Make
sure you enabled Random Number as a variable in GTM.
* `testVariant` - reads if the user has a cookie to see if he's in a current variant.
* `previewUrl` - do you want to enable the parameter to preview a variant, true by default.
* `variants` - the code for the variants, you can add an unlimited amount of variants.

We'll check if a user is in a certain variant to make sure that the user doesn't
get any mixed up experiences. Next to that we also make sure the user is not in
any other test currently by checking for any cookies that start with: `tnw`.

### Quick start:
Include the whole script and at the top of the script change the testing variables:

	// Constants
	vars testID = '001',
		   testDays = 8,
		   randomNumber = {{Randon Number}},
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
		   };

*Note:* You'll never have to add 0, it will take care of the original variant itself.
You can read more about [how to add a test in Google Tag Manager here](https://github.com/MartijnSch/cro/wiki/How-to-add-a-test-in-Google-Tag-Manager-(GTM)).

#### Google Analytics
To measure the variants + experiments in Google Analytics we send the data to
Google Analytics via custom dimensions. In both scripts we send the data via the
`sendDimension(variant)` function.
You'll have to create a custom report in Google Analytics to show you the
specific data for your variants.

Data in Google Analytics for different variants will show up like:

* `tnw-{testID}-{testVariant}` for A/B testing.
* `tnw-{testID}-{changeID}-{testVariant}` for multivariate testing (MVT).

*Note:* Currently it's using dimension 10, if you start using this you might
want to change this dimension and set it up in Google Analytics. Also we use the
 prepend: `tnw` but obviously you can change this to whatever you'd like.

#### Cookies
We set the cookies for the length of the test that is added in the variables at
the beginning of a test. The names and values of the cookies look like:

* Name: `tnw-{testID}`, with the value: `{testVariant}` for A/B testing.
* Name: `tnw-{testID}`, with the value: `{changeID}-{testVariant}` for
multivariate testing (MVT).

*Note:* We prepend the cookie name: `tnw` but obviously you can change this to
whatever you'd like.

#### Preview
You want to preview the changes of a certain test? Make sure that you add:
`?previewUrl={testVariant}` to the URL of a page to check your changes.

Todo
=======
* Make sure that you can run multiple A/B tests at the same time.

History
=======
#### November 21, 2015 (2015-11-21)
* Add a preview URL.

#### September 27, 2015 (2015-09-27)
* Added a check to see if Google Analytics is initialized.

#### August 18, 2015 (2015-08-18)
* Initial commit to add more information to the README.


# Want to contribute?
Contributions are welcome! There are just a few requested guidelines:

* Please create a feature branch for your changes and squash commits.
* Don't worry about updating the version, changelog, or minified version.
* Please respect the original syntax/formatting stuff.
* If proposing a new feature, it may be a good idea to create an issue first to discuss.

Maintainer history
------------------
  * [Martijn Scheijbeler](https://github.com/martijnsch/cro) (Current)
  * [Simon Vreeman](https://github.com/simonvreeman/a-b-testing-with-google-tag-manager) (Current)
