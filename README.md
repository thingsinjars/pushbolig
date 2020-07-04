# DEPRECATED

*This project is no longer maintained. If there's anything useful here, feel free to pull it out*

BoligPush
===

Very basic integration of [boligportal.dk](http://www.boligportal.dk) apartment search with [pushbullet.com](http://www.pushbullet.com) notifications.

Useful though BoligPortal is, the notifications quite often come through too late and you end up finding out about a great apartment six hours after it has already been taken. This script can be run on a schedule as often as you like. There is a local database of 'previously seen' apartments so when it finds a new one, you'll receive a notification immediately to all your registered pushbullet devices.

You can also add additional email addresses in `config/emails.json`.

Usage
---

  1. Clone this repository
  2. `npm install`
  3. Get your Pushbullet access token from [pushbullet.com/account](https://www.pushbullet.com/account)
  4. Save the access token using the [keyring](https://www.npmjs.com/package/keyring) module:
     * `node_modules/.bin/keyring store -k pushbullet.accessToken -v YOUR_ACCESS_TOKEN`
  5. Test it all works by running `node index.js`

Configuring the search
---

Modify the `config/search.json` file to match your search criteria.

    {
        "rooms": {
            "minimum": 3
        },
        "rent": {
            "minimum": 10000,
            "maximum": 17000
        },
        "size": {
            "minimum": 90,
            "maximum": 160
        },
        "postcodes": [1000, 1500, 1800, 2000, 2100, 2200, 2450, 2500],
        "furnished": false,
        "length_of_rental": {
            "2-12 months": false,
            "1-2 years": true,
            "2+ years": true,
            "unlimited": true
        }
    }

*NOTE: Bolig Portal treats any rent.maximum over 14000 as "no maximum limit" so if there is a rent.maximum set, results with a higher rent will be removed before notifications are sent.*

Scheduling
---

You can run this with any scheduler. If you are running this on a system with `watch` available, the easiest way is to leave this running in a terminal window:

    watch -n500 'node index.js'

If you're on a platform that doesn't have watch (like OS X), this will do the same job:

    while :; do node index.js; sleep 500; done

For other platforms, use whatever is available.

License
---

The bits of this project I wrote are all MIT licensed. The boligportal.dk API and all the content provided by it belongs to Boligportal.dk ApS.
