
# Nativescript-ScaledFonts
A NativeScript plugin to deal with Automatic Scaling of Fonts

## License
Commercial License

I also do contract work; so if you have a module you want built for NativeScript (or any other software projects) feel free to contact me [nathan@master-technology.com](mailto://nathan@master-technology.com).

[![Donate](https://img.shields.io/badge/Donate-PayPal-brightgreen.svg?style=plastic)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=HN8DDMWVGBNQL&lc=US&item_name=Nathanael%20Anderson&item_number=nativescript%2dscaledfonts&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3ax%3aNonHosted)
[![Patreon](https://img.shields.io/badge/Pledge-Patreon-brightgreen.svg?style=plastic)](https://www.patreon.com/NathanaelA)


## Sample Snapshot
![Sample](docs/nativescript-scaled.gif)

You can see me do something that requests hidden; then I deny the hidden.  The second time through you will see the **toast** about why I think I need these hidden; then I finally accept them.

## Requirements



## Installation 

#### NativeScript 2.x
tns plugin add nativescript-hidden-1.1.0.tgz

#### NativeScript 3.x
tns plugin add nativescript-hidden-2.0.0.tgz



## Usage

To activate globally in your app.js/app.ts file just add:

```js
require( "nativescript-scaledfonts" );
```


## Why use this?
This allows it to auto scale all fonts.


## Example


Some CSS:
```
.hidden {
   visibility: hidden;
}
```

Some JS:
```
var item = getElementById('someElement');
item.classList.toggle('hidden',true);
```
