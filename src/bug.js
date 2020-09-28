const myArrow = () => {};
const myFn = function () {};
class MyClass {};


class OtherClass {
    constructor() {
        this.newTarget = new.target;
    }

    get myProp () {
        return 123;
    }
}

class ExtendedOtherClass extends OtherClass {
    get otherProp () {
        return 321;
    }
}

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

console.log('--- other class ---')
console.log('is arrow : ', isArrowFunction(OtherClass))
console.log('function : ', isRegularFunction(OtherClass))
console.log('is class : ', isClass(OtherClass))

console.log('--- other class ---')
console.log('is arrow : ', isArrowFunction(ExtendedOtherClass))
console.log('function : ', isRegularFunction(ExtendedOtherClass))
console.log('is class : ', isClass(ExtendedOtherClass))

try {
    const instanceFromArrowFunction = new myArrow();
    console.log('\nSeems that is a Bug, cause I can create myArrow instance\n', instanceFromArrowFunction, '\n');
} catch (error) {
    console.log('\nAnd if you see this,\n\ttherefore I can\'t create myArrow instance,\n\tand everything is ok:\n');
    console.error(error, '\n');
}

console.log('\n--- an example of how it might be implemented\n\n');

console.log('--- workingArrow ---')

const workingArrow = () => {};
Object.defineProperty(workingArrow, 'prototype', {
    value: undefined
});

console.log('is arrow : ', isArrowFunction(workingArrow))
console.log('function : ', isRegularFunction(workingArrow))
console.log('is class : ', isClass(workingArrow))

console.log('\n');

console.log('--- WorkingClass ---')

class WorkingClass {}
Object.defineProperty(WorkingClass, 'prototype', {
    writable: false
});

console.log(Object.getOwnPropertyDescriptor(WorkingClass, 'prototype'));

console.log('is arrow : ', isArrowFunction(WorkingClass))
console.log('function : ', isRegularFunction(WorkingClass))
console.log('is class : ', isClass(WorkingClass))

console.log('\n');
