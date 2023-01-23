/**
 * @typedef {import('unist').Literal<number>} ExampleLiteral
 * @typedef {import('unist').Parent<ExampleLiteral>} ExampleParent
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {visitChildren} from './index.js'

function noop() {}

test('visitChildren', function () {
  assert.throws(
    function () {
      // @ts-expect-error runtime.
      visitChildren(noop)()
    },
    /Missing children in `parent`/,
    'should throw without arguments'
  )

  assert.throws(
    function () {
      // @ts-expect-error runtime.
      visitChildren(noop)({})
    },
    /Missing children in `parent`/,
    'should throw without parent'
  )
})

test('should call `fn` for each child in `parent`', function () {
  const children = [
    {type: 'x', value: 0},
    {type: 'x', value: 1},
    {type: 'x', value: 2},
    {type: 'x', value: 3}
  ]
  const context = {type: 'y', children}
  let n = -1

  visitChildren(function (
    /** @type {ExampleLiteral} */ child,
    index,
    /** @type {ExampleParent} */ parent
  ) {
    n++
    assert.equal(child, children[n])
    assert.equal(index, n)
    assert.equal(parent, context)
  })(context)
})

test('should work when new children are added', function () {
  const children = [
    {type: 'x', value: 0},
    {type: 'x', value: 1},
    {type: 'x', value: 2},
    {type: 'x', value: 3},
    {type: 'x', value: 4},
    {type: 'x', value: 5},
    {type: 'x', value: 6}
  ]
  let n = -1

  visitChildren(function (
    /** @type {ExampleLiteral} */ child,
    index,
    /** @type {ExampleParent} */ parent
  ) {
    n++

    if (index < 3) {
      parent.children.push({type: 'x', value: parent.children.length})
    }

    assert.deepEqual(child, children[n])
    assert.deepEqual(index, n)
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
})
