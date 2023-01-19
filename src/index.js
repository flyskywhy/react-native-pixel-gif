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
        for (
          let i = 0, end = reader.numFrames(), asc = 0 <= end;
          asc ? i < end : i > end;
          asc ? i++ : i--
        ) {
          var image;
          if (reader.frameInfo(i).width === reader.width && reader.frameInfo(i).height === reader.height) {
            image = new ImageData(reader.width, reader.height);
          } else if (i > 0) {
            image = new ImageData(new Uint8ClampedArray(result[i - 1].data), reader.width, reader.height);
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
