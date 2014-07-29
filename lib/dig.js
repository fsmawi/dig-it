var _ = require('lodash');

// There is a lot of overlap to the following two functions:
// needs refactoring.

// returns value of property at path, or array of properties if there is an
// array in the path
function getProp (obj, path, isArray) {
  var next;
  path = _.isString(path) ? path.split('.') : path;

  // We have more traversing to do
  if (path.length > 1) {
    next = path.shift();
    if (_.isArray(obj[next])) {
      isArray = true;
      return _.flatten(obj[next].map(function (el, i) {
        return getProp(el, _.clone(path), isArray);
      }));
    } else {
      return getProp(obj[next], path, isArray);
    }

  // No more traversing. We can now target the final node with path[0]
  } else {
    next = path[0];
    // if we are at the end of the path and `obj` is an array
    if (_.isArray(obj)) {
      return _.pluck(obj, next);
    } else {
      return isArray ? [
      obj[next]] : obj[next];
    }
  }
}

// setProp(obj, 'foo.bar.baz', function (baz) { });
function setProp (obj, path, func) {
  var next;
  path = _.isString(path) ? path.split('.') : path;

  // We have more traversing to do
  if (path.length > 1) {
    next = path.shift();
    if (_.isArray(obj[next])) {
      obj[next].forEach(function (el, i) {
        setProp(obj[next][i], _.clone(path), func);
      });
    } else {
      setProp(obj[next], _.clone(path), func);
    }

  // No more traversing. We can now target the final node with path[0]
  } else {
    next = path[0];
    // if we are at the end of the path and `obj` is an array
    if (_.isArray(obj)) {
      _.forEach(obj, function (el, i) {
        el = func(el);
      });
    } else {
      obj[next] = func(obj[next]);
    }
  }
}

var dig = function (obj) {
  return {
    get: getProp.bind(null, obj),
    set: setProp.bind(null, obj)
  };
};

module.exports = dig;
