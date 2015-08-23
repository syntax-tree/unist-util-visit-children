/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unist:util:visit-children
 * @fileoverview Test suite for `unist-util-visit-children`.
 */

'use strict';

/* eslint-env node, mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var visitChildren = require('./');

/*
 * Methods.
 */

var throws = assert.throws;
var equal = assert.strictEqual;

/**
 * No-op.
 */
function noop() {}

noop();

/*
 * Tests.
 */

describe('visitChildren()', function () {
    it('should throw when no `parent` is given', function () {
        throws(function () {
            visitChildren(noop)();
        }, /Missing children in `parent`/);

        throws(function () {
            visitChildren(noop)({});
        }, /Missing children in `parent`/);
    });

    it('should invoke `fn` for each child in `parent`', function () {
        var values = [0, 1, 2, 3];
        var context = {};
        var n = -1;

        context.children = values;

        visitChildren(function (value, index, parent) {
            n++;
            equal(value, values[n]);
            equal(index, n);
            equal(parent, context);
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

            equal(value, values[n]);
            equal(index, values[n]);
        })({
            'children': [0, 1, 2, 3]
        });
    });
});
