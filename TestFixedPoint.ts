import { FixedPoint } from "./FixedPoint";

let testEqual = function(fp: FixedPoint, n: number) {
	let nFp: FixedPoint = FixedPoint.fromNumber(n);
	console.log((nFp.rawValue == fp.rawValue)? "pass" : "fail");
}



// test add
let a: number = 6.63573;
let b: number = 8.385;
let aFp: FixedPoint = FixedPoint.fromNumber(a);
let bFp: FixedPoint = FixedPoint.fromNumber(b);
let fpSum: FixedPoint = FixedPoint.add(aFp, bFp);
testEqual(fpSum, a + b);

// test sub
// reuse and test when we subtract a larger number from a smaller (so negative res)
let fpAMinusB: FixedPoint = FixedPoint.sub(aFp, bFp);
testEqual(fpAMinusB, a - b);
