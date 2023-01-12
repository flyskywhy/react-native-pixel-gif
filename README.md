# react-native-pixel-gif

[![npm version](http://img.shields.io/npm/v/react-native-pixel-gif.svg?style=flat-square)](https://npmjs.org/package/react-native-pixel-gif "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/react-native-pixel-gif.svg?style=flat-square)](https://npmjs.org/package/react-native-pixel-gif "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/react-native-pixel-gif.svg?style=flat-square)](https://npmjs.org/package/react-native-pixel-gif "View this project on npm")
[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android%20%7C%20web-989898.svg?style=flat-square)](https://npmjs.org/package/react-native-pixel-gif "View this project on npm")

> Parse Gif to ImageData for React Native.

## Installation
```bash
$ npm install react-native-pixel-gif
```
For RN >= 0.65, run `npm install react-native-blob-util`.

For RN < 0.65, run `npm install react-native-blob-util@0.16.3`, and patch manually to [fix: with react-native-web product build will export 'URIUtil' (reexported as 'URIUtil') was not found](https://github.com/RonRadtke/react-native-blob-util/pull/201/files).
```js
var pixelGif= require('react-native-pixel-gif');
console.log(pixelGif); //object
```

# API

## pixelGif.parse(`file`) -> promise.then(`images`)

return `images` is Array contains one or more `ImageData`.

```js
var file= 'https://59naga.github.io/fixtures/animated.GIF';

pixelGif.parse(file).then(function(images){
  var i= 0;

  console.log(images.loopCount); // 0(Infinite)

  var nextImage= function(){
    var imageData= images[i++];
    if(imageData==null) return;

    console.log(imageData);
    nextImage();
  }

  nextImage();
});
// { width: 73, height: 73, x: 0, y: 0, has_local_palette: false, palette_offset: 13, data_offset: 818, data_length: 393, transparent_index: null, interlaced: false, delay: 1000, disposal: 0, data: <Uint8Array ..> }
// { width: 73, height: 73, x: 0, y: 0, has_local_palette: false, palette_offset: 13, data_offset: 1229, data_length: 387, transparent_index: null, interlaced: false, delay: 900, disposal: 0, data: <Uint8Array ..>  }
// { width: 73, height: 73, x: 0, y: 0, has_local_palette: false, palette_offset: 13, data_offset: 1634, data_length: 393, transparent_index: null, interlaced: false, delay: 800, disposal: 0, data: <Uint8Array ..>  }
// ...
```
> `images` can be resized and also keep property e.g. `delay` by `resizeImageDatas` of [react-native-pixel-util](https://github.com/flyskywhy/react-native-pixel-util).

# See
* [react-native-pixel](https://github.com/flyskywhy/react-native-pixel)
* [react-native-pixel-util](https://github.com/flyskywhy/react-native-pixel-util)
* __react-native-pixel-gif__
* [react-native-pixel-png](https://github.com/flyskywhy/react-native-pixel-png)
* [react-native-pixel-jpg](https://github.com/flyskywhy/react-native-pixel-jpg)
* [react-native-pixel-bmp](https://github.com/flyskywhy/react-native-pixel-bmp)
* [react-native-pixel-webp](https://github.com/flyskywhy/react-native-pixel-webp)
* [pixel-to-ansi](https://github.com/59naga/pixel-to-ansi)
* [pixel-to-svg](https://github.com/59naga/pixel-to-svg)

License
---
[MIT][License]

[License]: http://59naga.mit-license.org/
