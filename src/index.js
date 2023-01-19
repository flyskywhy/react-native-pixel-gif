/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Dependencies
import {PixelUtil} from 'react-native-pixel-util';
import {GifReader} from 'omggif';

class PixelGif extends PixelUtil {
  parse(file) {
    return this.createBuffer(file).then(buffer => {
      const reader = new GifReader(new Uint8Array(buffer));

      const images = (() => {
        const result = [];
        var gifNeedsDisposal = true;
        for (
          let i = 0, end = reader.numFrames(), asc = 0 <= end;
          asc ? i < end : i > end;
          asc ? i++ : i--
        ) {
          const width = reader.width;
          const height = reader.height;

          const patchLeft = reader.frameInfo(i).x;
          const patchTop = reader.frameInfo(i).y;
          const patchWidth = reader.frameInfo(i).width;
          const patchHeight = reader.frameInfo(i).height;

          var image;
          if (patchWidth === width && patchHeight === height) {
            image = new ImageData(width, height);
          } else if (i > 0) {
            image = new ImageData(new Uint8ClampedArray(result[i - 1].data), width, height);
          }

          var object = reader.frameInfo(i);
          for (var key in object) {
            if (key === 'width' || key === 'height') {
              // to avoid `Cannot assign to read only property 'width' of object '#<ImageData>'` on Web
              continue;
            }
            var value = object[key];
            image[key] = value;
          }
          if (image.hasOwnProperty('delay')) {
            image.delay = image.delay * 10;
          } else {
            image.delay = 100; // ms
          }

          // ref to https://github.com/flyskywhy/gifuct-js/blob/2.2.2/src/index.js#L102
          if (gifNeedsDisposal) {
            for (let y = 0; y < patchHeight; y++) {
              for (let x = 0; x < patchWidth; x++) {
                let op = (((y + patchTop) * width) + x + patchLeft) * 4;
                image.data[op++] = 0;
                image.data[op++] = 0;
                image.data[op++] = 0;
                image.data[op] = 0;
              }
            }
            gifNeedsDisposal = false;
          }
          if (reader.frameInfo(i).disposal === 2) {
            gifNeedsDisposal = true;
          }

          reader.decodeAndBlitFrameRGBA(i, image.data);

          result.push(image);
        }
        return result;
      })();

      images.loopCount = reader.loopCount();
      if (images.loopCount == null) {
        images.loopCount = -1;
      }
      return images;
    });
  }
}

export default new PixelGif();
export {PixelGif};
