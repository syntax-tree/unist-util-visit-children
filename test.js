'use strict';

/* eslint-env mocha */

/* Dependencies. */
var assert = require('assert');
var visitChildren = require('./');

var noop = Function.prototype;

/* Tests. */
describe('visitChildren()', function () {
  it('should throw when no `parent` is given', function () {
    assert.throws(
      function () {
        visitChildren(noop)();
      },
      /Missing children in `parent`/
    );

    assert.throws(
      function () {
        visitChildren(noop)({});
      },
      /Missing children in `parent`/
    );
  });

  it('should invoke `fn` for each child in `parent`', function () {
    var values = [0, 1, 2, 3];
    var context = {};
    var n = -1;

    context.children = values;

    visitChildren(function (value, index, parent) {
      n++;
      assert.strictEqual(value, values[n]);
      assert.strictEqual(index, n);
      assert.strictEqual(parent, context);
    })(context);
  });

  it('should work when new children are added', function () {
    var values = [0, 1, 2, 3, 4, 5, 6];
    var n = -1;

    visitChildren(function (value, index, parent) {
      n++;

      if (index < 3) {
        parent.children.push(parent.children.length);
      }

      assert.strictEqual(value, values[n]);
      assert.strictEqual(index, values[n]);
    })({
      children: [0, 1, 2, 3]
    });
  });
});
