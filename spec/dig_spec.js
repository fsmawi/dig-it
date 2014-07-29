var dig = require('../lib/dig');

describe('dig', function () {

  var noArray = { foo: { bar: { baz: 'bing!' } } };
  var singleArray = { foo: { bars: [{ baz: 'bing!' }, { baz: 'boom!'}] } };
  var multiArray = { foos: [{ bars: [{ baz: 'bing!' }, { baz: 'boom!'}] }, { bars: [{ baz: 'blam!' }] }] };

  describe('dig().get()', function () {
    describe('on a simple nested object structure', function () {
      it('should return the value of the the nested property', function () {
        var nested = dig(noArray).get('foo.bar.baz');
        expect(nested).toBe('bing!');
      });
    });

    describe('on a data structure contain an array', function () {
      it('should return the value of the the nested property', function () {
        var nested = dig(singleArray).get('foo.bars.baz');
        expect(nested.length).toEqual(2);
        expect(nested[0]).toBe('bing!');
        expect(nested[1]).toBe('boom!');
      });
    });

    describe('on a data structure contain multiple arrays', function () {
      it('should return the value of the the nested property', function () {
        var nested = dig(multiArray).get('foos.bars.baz');
        expect(nested.length).toEqual(3);
        expect(nested[0]).toBe('bing!');
        expect(nested[1]).toBe('boom!');
        expect(nested[2]).toBe('blam!');
      });
    });
  });

  describe('dig.set()', function () {
    describe('on a simple nested object structure', function () {
      var nestedData = { foo: { bar: { baz: 'bing!' } } };
      it('should return the value of the the nested property', function () {
        var val = 'hooray!';
        dig(noArray).set('foo.bar.baz', function () { return val; });
        expect(noArray.foo.bar.baz).toBe(val);
      });
    });

    describe('on a data structure contain an array', function () {
      it('should return the value of the the nested property', function () {
        var i = 0;
        dig(singleArray).set('foo.bars.baz', function () {
          return i++;
        });
        expect(singleArray.foo.bars[0].baz).toEqual(0);
        expect(singleArray.foo.bars[1].baz).toEqual(1);
      });
    });

    describe('on a data structure contain multiple arrays', function () {
      it('should return the value of the the nested property', function () {
        var i = 0;
        dig(multiArray).set('foos.bars.baz', function () {
          return i++;
        });
        expect(multiArray.foos[0].bars[0].baz).toEqual(0);
        expect(multiArray.foos[0].bars[1].baz).toEqual(1);
        expect(multiArray.foos[1].bars[0].baz).toEqual(2);
      });
    });
  });
});
