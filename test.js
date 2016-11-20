'use strict';

var test = require('tape');
var visitChildren = require('./');

var noop = Function.prototype;

/* Tests. */
test('visitChildren()', function (t) {
  t.throws(
    function () {
      visitChildren(noop)();
    },
    /Missing children in `parent`/,
    'should throw without arguments'
  );

  t.throws(
    function () {
      visitChildren(noop)({});
    },
    /Missing children in `parent`/,
    'should throw without parent'
  );

  t.test('should invoke `fn` for each child in `parent`', function (st) {
    var values = [0, 1, 2, 3];
    var context = {};
    var n = -1;

    context.children = values;

    visitChildren(function (value, index, parent) {
      n++;
      st.strictEqual(value, values[n]);
      st.strictEqual(index, n);
      st.strictEqual(parent, context);
    })(context);

    st.end();
  });

  t.test('should work when new children are added', function (st) {
    var values = [0, 1, 2, 3, 4, 5, 6];
    var n = -1;

    visitChildren(function (value, index, parent) {
      n++;

      if (index < 3) {
        parent.children.push(parent.children.length);
      }

      st.strictEqual(value, values[n]);
      st.strictEqual(index, values[n]);
    })({children: [0, 1, 2, 3]});

    st.end();
  });

  t.end();
});
