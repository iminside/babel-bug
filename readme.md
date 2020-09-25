This repo describes [Babel.js](https://github.com/babel/babel) bug for distinguishing between Arrow Functions, Classes and Regular Functions.

# Installation

```bash
git clone
npm i
```

And after installation, for dealing with **bug**:

```bash
npm run bug
```

for dealing with **original** JavaScript behaviour:
```bash
npm run original
```


# Description

Accordingly with the following gis: https://gist.github.com/wentout/ea3afe9c822a6b6ef32f9e4f3e98b1ba

We might have difference between Functions, Regular Functions or Arrow Functions:

```javascript
'use strict';

const myArrow = () => {};
const myFn = function () {};

class MyClass {};
```

And if we might be willing to check what sort of function we are dealing with, we have the ability to check the difference with the following steps:

```javascript
const isArrowFunction = (fn) => {
	if (typeof fn !== 'function') {
		return false;
	}
	if (fn.prototype !== undefined) {
		return false;
	}
	return true;
};

const isRegularFunction = (fn) => {
	if (typeof fn !== 'function') {
		return false;
	}
	if (typeof fn.prototype !== 'object') {
		return false;
	}
	if (fn.prototype.constructor !== fn) {
		return false;
	}
	return Object.getOwnPropertyDescriptor(fn, 'prototype').writable === true;
};

const isClass = (fn) => {
	if (typeof fn !== 'function') {
		return false;
	}
	if (typeof fn.prototype !== 'object') {
		return false;
	}
	if (fn.prototype.constructor !== fn) {
		return false;
	}
	return Object.getOwnPropertyDescriptor(fn, 'prototype').writable === false;
};
```

And that is how babel transforms functions:

```javascript
var myArrow = function myArrow() {};

var myFn = function myFn() {};

var MyClass = function MyClass() {
  _classCallCheck(this, MyClass);
};
```

Therefore regular checking via JavaScript runtime wouldn't work anymore, because everything becomes functions.

# Screenshots

Before babel transforms

![](https://habrastorage.org/webt/iu/4j/zt/iu4jztsnvsstnaedrr3wdmcjvxw.png)

After

![](https://habrastorage.org/webt/bb/he/u2/bbheu29ij5lh7fcayp31mg9cvyc.png)