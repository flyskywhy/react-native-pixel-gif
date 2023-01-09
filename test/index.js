/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Dependencies
const pixelGif = require('../src').default;
const fixture = require('fixture-images');

// Specs
describe('pixel-gif', () =>
  describe('.parse', function() {
    it('animated', function(done) {
      const file = fixture.animated.gif;

      return pixelGif.parse(file).then(function(images) {
        expect(images.loopCount).toBe(0);

        const image = images[0];
        expect(image.width).toBe(73);
        expect(image.height).toBe(73);
        expect(image.data.length).toBe(image.width * image.height * 4);

        return done();
      });
    });

    return it('static', function(done) {
      const file = fixture.still.gif;

      return pixelGif.parse(file).then(function(images) {
        expect(images.loopCount).toBe(-1);

        const image = images[0];
        expect(image.width).toBe(112);
        expect(image.height).toBe(112);
        expect(image.data.length).toBe(image.width * image.height * 4);

        return done();
      });
    });
  }));
