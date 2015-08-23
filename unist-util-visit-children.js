(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.unistUtilVisitChildren = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unist:util:visit-children
 * @fileoverview Unist utility to visit direct children of a parent.
 */

'use strict';

/* eslint-env commonjs */

/**
 * Visitor for children of `parent`.
 *
 * @typedef visitChildren~callback
 * @param {Node} child - Current iteration;
 * @param {number} index - Position of `child` in `parent`;
 * @param {Node} parent - Parent node of `child`.
 */

/**
 * Function invoking a bound `fn` for each child of `parent`.
 *
 * @typedef visitChildren~visitor
 * @param {Node} parent - Node with children.
 * @throws {Error} - When not given a parent node.
 */

/**
 * Turns `callback` into a child-visitor accepting a parent.
 *
 * @param {visitChildren~callback} callback - Function to wrap.
 * @return {visitChildren~visitor} - Wrapped `fn`.
 */
function visitorFactory(callback) {
    return function (parent) {
        var index = -1;
        var children = parent && parent.children;

        if (!children) {
            throw new Error('Missing children in `parent` for `visitor`');
        }

        while (++index in children) {
            callback(children[index], index, parent);
        }
    };
}

/*
 * Expose.
 */

module.exports = visitorFactory;

},{}]},{},[1])(1)
});