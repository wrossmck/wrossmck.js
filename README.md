wrossmck.js
===========

A twitter bot that sounds like [@wrossmck](http://twitter.com/wrossmck)

##Setup

Add twitter auth settings to a file called `auth.json` in properly formatted JSON like:
```
{
	"consumer_key":"key",
	"consumer_secret":"secret",
	"access_token_key":"key",
	"access_token_secret":"secret"
}
```

Add your plain text markov generator content to `text.txt`. For example:
```
	This is my first example.
	This is my next.
	There are no more examples.
```

## Usage Directions

* run `npm start`
* type some initial text to invoke a response `> Hello`