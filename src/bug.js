const myArrow = () => {}
const myFn = function () {}

class MyClass {}

const isArrowFunction = (fn) => {
    if (typeof fn !== 'function') {
        return false
    }
    if (fn.prototype !== undefined) {
        return false
    }
    return true
}

const isRegularFunction = (fn) => {
    if (typeof fn !== 'function') {
        return false
    }
    if (typeof fn.prototype !== 'object') {
        return false
    }
    if (fn.prototype.constructor !== fn) {
        return false
    }
    return Object.getOwnPropertyDescriptor(fn, 'prototype').writable === true
}

const isClass = (fn) => {
    if (typeof fn !== 'function') {
        return false
    }
    if (typeof fn.prototype !== 'object') {
        return false
    }
    if (fn.prototype.constructor !== fn) {
        return false
    }
    return Object.getOwnPropertyDescriptor(fn, 'prototype').writable === false
}

console.log('--- arrow ---')
console.log('is arrow : ', isArrowFunction(myArrow))
console.log('function : ', isRegularFunction(myArrow))
console.log('is class : ', isClass(myArrow))

console.log('--- function ---')
console.log('is arrow : ', isArrowFunction(myFn))
console.log('function : ', isRegularFunction(myFn))
console.log('is class : ', isClass(myFn))

console.log('--- class ---')
console.log('is arrow : ', isArrowFunction(MyClass))
console.log('function : ', isRegularFunction(MyClass))
console.log('is class : ', isClass(MyClass))

try {
    const instanceFromArrowFunction = new myArrow();
    console.log('\nSeems that is a Bug, cause I can create myArrow instance\n', instanceFromArrowFunction, '\n');
} catch (error) {
    console.log('\nAnd if you see this,\n\ttherefore I can\'t create myArrow instance,\n\tand everything is ok:\n');
    console.error(error, '\n');
}
