/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Literal<number>} ExampleLiteral
 * @typedef {import('unist').Parent<ExampleLiteral>} ExampleParent
 */

import test from 'tape'
import {visitChildren} from './index.js'

function noop() {}

test('visitChildren()', function (t) {
  t.throws(
    function () {
      // @ts-expect-error runtime.
      visitChildren(noop)()
    },
    /Missing children in `parent`/,
    'should throw without arguments'
  )

  t.throws(
    function () {
      // @ts-expect-error runtime.
      visitChildren(noop)({})
    },
    /Missing children in `parent`/,
    'should throw without parent'
  )

  t.test('should call `fn` for each child in `parent`', function (st) {
    var children = [
      {type: 'x', value: 0},
      {type: 'x', value: 1},
      {type: 'x', value: 2},
      {type: 'x', value: 3}
    ]
    var context = {type: 'y', children}
    var n = -1

    visitChildren(function (
      /** @type {ExampleLiteral} */ child,
      index,
      /** @type {ExampleParent} */ parent
    ) {
      n++
      st.strictEqual(child, children[n])
      st.strictEqual(index, n)
      st.strictEqual(parent, context)
    })(context)

    st.end()
  })

  t.test('should work when new children are added', function (st) {
    var children = [
      {type: 'x', value: 0},
      {type: 'x', value: 1},
      {type: 'x', value: 2},
      {type: 'x', value: 3},
      {type: 'x', value: 4},
      {type: 'x', value: 5},
      {type: 'x', value: 6}
    ]
    var n = -1

    visitChildren(function (
      /** @type {ExampleLiteral} */ child,
      index,
      /** @type {ExampleParent} */ parent
    ) {
      n++

      if (index < 3) {
        parent.children.push({type: 'x', value: parent.children.length})
      }

      st.deepEqual(child, children[n])
      st.deepEqual(index, n)
    })(
      /** @type {ExampleParent} */ ({
        type: 'y',
        children: [
          {type: 'x', value: 0},
          {type: 'x', value: 1},
          {type: 'x', value: 2},
          {type: 'x', value: 3}
        ]
      })
    )

    st.end()
  })

  t.end()
})
