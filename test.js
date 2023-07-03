/**
 * @typedef {import('unist').Literal<unknown>} ExampleLiteral
 * @typedef {import('unist').Parent<ExampleLiteral>} ExampleParent
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {visitChildren} from 'unist-util-visit-children'

function noop() {}

test('visitChildren', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('unist-util-visit-children')).sort(),
      ['visitChildren']
    )
  })

  await t.test('should throw without arguments', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      visitChildren(noop)()
    }, /Missing children in `parent`/)
  })

  await t.test('should throw without parent', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      visitChildren(noop)({})
    }, /Missing children in `parent`/)
  })
  await t.test('should call `fn` for each child in `parent`', function () {
    const children = [
      {type: 'x', value: 0},
      {type: 'x', value: 1},
      {type: 'x', value: 2},
      {type: 'x', value: 3}
    ]
    /** @type {ExampleParent} */
    const context = {type: 'y', children}
    let n = -1

    visitChildren(
      /**
       * @param {ExampleLiteral} child
       * @param {ExampleParent} parent
       */
      function (child, index, parent) {
        n++
        assert.equal(child, children[n])
        assert.equal(index, n)
        assert.equal(parent, context)
      }
    )(context)
  })

  await t.test('should work when new children are added', function () {
    const children = [
      {type: 'x', value: 0},
      {type: 'x', value: 1},
      {type: 'x', value: 2},
      {type: 'x', value: 3},
      {type: 'x', value: 4},
      {type: 'x', value: 5},
      {type: 'x', value: 6}
    ]
    /** @type {ExampleParent} */
    const parent = {
      type: 'y',
      children: [
        {type: 'x', value: 0},
        {type: 'x', value: 1},
        {type: 'x', value: 2},
        {type: 'x', value: 3}
      ]
    }
    let n = -1

    visitChildren(
      /**
       * @param {ExampleLiteral} child
       * @param {ExampleParent} parent
       */
      function (child, index, parent) {
        n++

        if (index < 3) {
          parent.children.push({type: 'x', value: parent.children.length})
        }

        assert.deepEqual(child, children[n])
        assert.deepEqual(index, n)
      }
    )(parent)
  })
})
