import { FixedPoint } from "./FixedPoint";

// This creates a tester function that lets us test a FixedPoint operation on a list of pairs of operands
// See the testOperation function below
let createTestOperation = function(fixedPointFn: (a: FixedPoint, b: FixedPoint) => FixedPoint, fn: (a: number, b: number) => number, debug: boolean = false, maxError: number = 0.0001): (operandPairs: [number, number][]) => void {
	return function(operandPairs: [number, number][]) {
		testOperation(operandPairs, fixedPointFn, fn, debug, maxError);
	}
}

// This is the heart of our testing.
// We take in a list of pairs of number operands, and 2 flavors of an operation to test: the default operation and our FixedPoint emulation of the operation
// For each pair of operands we apply both the regular and fixed point versions to the operands and compare the results.
let testOperation = function(operandPairs: [number, number][], fixedPointFn: (a: FixedPoint, b: FixedPoint) => FixedPoint, fn: (a: number, b: number) => number, debug: boolean = false, maxError: number) {
	for(let operandPair of operandPairs) {
		let op1: number = operandPair[0];
		let op2: number = operandPair[1];
		// do the operation in the FixedPoint world
		let op1FP: FixedPoint = FixedPoint.fromNumber(op1);
		let op2FP: FixedPoint = FixedPoint.fromNumber(op2);
		let testResultFP: FixedPoint = fixedPointFn(op1FP, op2FP);

		// do the operation normally
		let expectedResult: number = fn(op1, op2);

		// test if both operations produce approximately equal results
		testEqual(testResultFP, expectedResult, debug, maxError);
	}
}

// tests if a fixed point number is approximately equal to a given number
let testEqual = function(fp: FixedPoint, n: number, debug: boolean, maxError: number) {
	if (debug) {
		console.log(`FixedPoint to number: ${FixedPoint.toNumber(fp)} vs expected number: ${n}`);
	}
	let diff: number = Math.abs(FixedPoint.toNumber(fp) - n);
	console.log((diff <= maxError)? "pass" : "fail");
}


let a: number = 6.63573;
let b: number = 8.385;

// test add
let testAdd: (operandPairs: [number, number][]) => void = createTestOperation(FixedPoint.add, (a, b) => a + b);
testAdd([[a, b], [a, -1*b], [-1.2343, 1084.24324]]);

// test sub
let testSub: (operandPairs: [number, number][]) => void = createTestOperation(FixedPoint.sub, (a, b) => a - b);
testSub([[a, b], [134,-123], [23423.5446, -3545.345]]);

// test mul
let testMul: (operandPairs: [number, number][]) => void = createTestOperation(FixedPoint.mul, (a, b) => a * b, undefined, 0.001);
testMul([[a, b], [a, -b], [-1 * a, b], [-23.424, 234], [23.424, 234]]);

// test div
let testDiv: (operandPairs: [number, number][]) => void = createTestOperation(FixedPoint.div, (a, b) => a / b, undefined, 0.01);
testDiv([[1,3], [1,-3], [-1,3], [-1,-3], [a, b], [14.34, 0.23], [0.1232, 0.21], [24.34, -7.62]]);
