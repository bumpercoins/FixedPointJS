export class FixedPoint {
	// This class represents a Q15.16 fixed point number
	// We implement 4 basic operations: +, -, *, /...
	// ...without checking for over/under-flow
	
	// the scaling factor is 1/(2^16) or 2^-16
	static scaleShift = 16;
	
	// This is the unscaled, backing number that is a signed integer
	// This number should be able to be precisely represented in 32 bit 2's complement
	// We divide this by 2^16 to get the value this object represents
	rawValue: number;

	constructor(rawValue: number) {
		this.rawValue = rawValue | 0;
	}

	static fromNumber(n: number): FixedPoint {
		return new FixedPoint((n * ( 1 << FixedPoint.scaleShift)) | 0);
	}

	static toNumber(a: FixedPoint): number {
		return a.rawValue/(1 << FixedPoint.scaleShift);
	}

	static add(a: FixedPoint, b: FixedPoint): FixedPoint {
		return new FixedPoint(((a.rawValue|0) + (b.rawValue|0))|0);
	}

	static sub(a: FixedPoint, b: FixedPoint): FixedPoint {
		return new FixedPoint(((a.rawValue|0) - (b.rawValue|0))|0);
	}

	static mul(a: FixedPoint, b: FixedPoint): FixedPoint {
		let aHi: number = a.rawValue >> FixedPoint.scaleShift;
		let aLo: number = a.rawValue & 0x0000FFFF;
		let bHi: number = b.rawValue >> FixedPoint.scaleShift;
		let bLo: number = b.rawValue & 0x0000FFFF;
		return new FixedPoint((
			((Math.imul(aLo, bLo)) >> FixedPoint.scaleShift) +
			(Math.imul(aLo, bHi) | 0) +
			(Math.imul(bLo, aHi) | 0) +
			((Math.imul(aHi, bHi)) << FixedPoint.scaleShift)
		) | 0);
	}




}
