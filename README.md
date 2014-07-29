# Dig
A simple utility for getting/setting values on nested data structures.  If you are familiar with Lodash's "pluck" method, this is similar, but for nested arrays and objects.

```javascript
var data = {
  foos: [{
    bars: [{
      id: 123
    }, {
      id: 234
    }]
  }]
};
var ids = dig(data).get('foos.bars.id'); // ids is [123, 234]
```

There is also a facility for setting data at nested paths:
```javascript
var data = {
  foos: [{
    bars: [{
      id: 123,
      name: 'bing'
    }, {
      id: 234,
      name: 'blam'
    }]
  }]
};
dig(data).set('foos.bars', function (bars) {
  return dig(bars).get('id');
});
// 'bars' properties in data.foos now contain arrays of bar ids
```
