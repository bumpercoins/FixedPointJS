export class FixedPoint {
	// This class represents a Q15.16 fixed point number
	
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
		return new FixedPoint((n << FixedPoint.scaleShift) | 0);
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




}
