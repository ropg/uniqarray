> Array that will only ever hold unique values

# UniqArray

This package gives you a `UniqArray` class that does everything a regular `Array` does, except it will ignore it when you try to add any values that are already contained in it.

> Frustratingly, there's a ton of packages in the index that provide just a single function to remove duplicates and return the array. All equivalents of `let uniqueItems = [...new Set(items)]`. 
>This provides a convenient full-featured array where the duplicates never make it in, so you don't have to filter them out all the time. 

## Installation

```text
npm install uniqarray --save
```

## Usage

```js
const UniqArray = require('uniqarray');

let a = new UniqArray(1,2,3,2);
console.log(a);                         // UniqArray(3) [ 1, 2, 3 ]
a.push(4,1,2,5,2);
console.log(a);                         // UniqArray(5) [ 1, 2, 3, 4, 5 ]
a.unshift(4,1,0);
console.log(a);                         // UniqArray(6) [ 0, 1, 2, 3, 4, 5 ]
console.log(a.concat([1,3,2,6,2,7]));   // UniqArray(8) [ 0, 1, 2, 3, 4, 5, 6, 7 ]
```

## Limitations

Works for "scalar values" (such as numbers and strings), does not look inside objects (which includes arrays):

```js
a = new UniqArray()
a.push (1,2,3,1,{a:true},{a:true},[1,2],[1,2])
console.log(a);
// UniqArray(7) [ 1, 2, 3, { a: true }, { a: true }, [ 1, 2 ], [ 1, 2 ] ]
```

( If you need something that will also reject objects with the same contents, you may want [`node-unique-array`](https://www.npmjs.com/package/node-unique-array), although that doesn't have the same interface as a regular js array. )

## Code

There really isn't all that much to it. Feel free to copy code below to your own project instead of depending on this module if you prefer that.

```js
class UniqArray extends Array {
    constructor(...args) {
        super(...new Set(args));
    }
    push(...args) {
        for (const a of args) if (!this.includes(a)) super.push(a);
        return this.length;
    }
    unshift(...args) {
        for (const a of args.reverse()) if (!this.includes(a)) super.unshift(a);
        return this.length;
    }
    concat(...args) {
        let r = new UniqArray(...this);
        for (const a of args) r.push(a);
        return r;
    }
}

module.exports = UniqArray
```
