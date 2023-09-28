export class FixedPoint {
	// This class represents a Q15.16 fixed point number
	// We implement 4 basic arithmetic operations +, -, *, / along with sqrt
	// ...without checking for over/under-flow
	// Note that in BumperCoins we work with small, manageable numbers
	
	// the scaling factor is 1/(2^16) or 2^-16
	static scaleShift = 16;

	static zero = new FixedPoint(0|0);
	static one = new FixedPoint(1 << FixedPoint.scaleShift);
	
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

	static clone(a: FixedPoint): FixedPoint {
		return new FixedPoint(a.rawValue);
	}

	static equals(a: FixedPoint, b: FixedPoint): boolean {
		return a.rawValue == b.rawValue;
	}

	static lessThan(a: FixedPoint, b: FixedPoint): boolean {
		return a.rawValue < b.rawValue;
	}

	static greaterThan(a: FixedPoint, b: FixedPoint): boolean {
		return a.rawValue > b.rawValue;
	}

	static lessThanOrEqual(a: FixedPoint, b: FixedPoint): boolean {
		return a.rawValue <= b.rawValue;
	}

	static greaterThanOrEqual(a: FixedPoint, b: FixedPoint): boolean {
		return a.rawValue >= b.rawValue;
	}

	static abs(a: FixedPoint): FixedPoint {
		let signMask = a.rawValue >> 31;
		return new FixedPoint(((a.rawValue|0) + signMask) ^ signMask);
	}

	static negate(a: FixedPoint): FixedPoint {
		return new FixedPoint(Math.imul(-1, a.rawValue)|0);
	}

	static double(a: FixedPoint): FixedPoint {
		return new FixedPoint(a.rawValue << 1);
	}

	static halve(a: FixedPoint): FixedPoint {
		return new FixedPoint(a.rawValue >> 1);
	}

	static add(a: FixedPoint, b: FixedPoint): FixedPoint {
		return new FixedPoint(((a.rawValue|0) + (b.rawValue|0))|0);
	}

	static sub(a: FixedPoint, b: FixedPoint): FixedPoint {
		return new FixedPoint(((a.rawValue|0) - (b.rawValue|0))|0);
	}

	static mul(a: FixedPoint, b: FixedPoint): FixedPoint {
		let positiveSign: boolean = true;
		let aRawValue: number = a.rawValue;
		let bRawValue: number = b.rawValue;
		if (aRawValue < 0) {
			aRawValue *= -1;
			positiveSign = !positiveSign;
		}
		if (bRawValue < 0) {
			bRawValue *= -1;
			positiveSign = !positiveSign;
		}
		let aHi: number = aRawValue >> FixedPoint.scaleShift;
		let aLo: number = aRawValue & 0x0000FFFF;
		let bHi: number = bRawValue >> FixedPoint.scaleShift;
		let bLo: number = bRawValue & 0x0000FFFF;
		let sum: number = ((
			// the hi int don't think will be big, but the lo frac part may be so use unsigned?
			//((Math.imul(aLo, bLo)) >> FixedPoint.scaleShift) +
			((Math.imul(aLo, bLo)) >>> FixedPoint.scaleShift) +
			(Math.imul(aLo, bHi) | 0) +
			(Math.imul(bLo, aHi) | 0) +
			((Math.imul(aHi, bHi)) << FixedPoint.scaleShift)
		) | 0);
		if (!positiveSign) {
			sum *= -1;
		}
		return new FixedPoint(sum);
	}

	static div(a: FixedPoint, b: FixedPoint): FixedPoint {
		let positiveSign: boolean = true;
		let aRawValue: number = a.rawValue;
		let bRawValue: number = b.rawValue;
		if (aRawValue < 0) {
			aRawValue *= -1;
			positiveSign = !positiveSign;
		}
		if (bRawValue < 0) {
			bRawValue *= -1;
			positiveSign = !positiveSign;
		}
		let remainder: number = aRawValue >>> 0;
		let divisor: number = bRawValue >>> 0;
		let leftShift: number = FixedPoint.scaleShift;
		let quotient: number = 0 >>> 0;
		while(remainder > 0 && leftShift >=0) {
			let remainderShift: number = Math.clz32(remainder);
			remainderShift = Math.min(remainderShift, leftShift);
			remainder <<= remainderShift;
			leftShift -= remainderShift

			// crucial to >>> 0 the remainder to treat it is unsigned and not a negative #
			let res: number = ((remainder >>> 0)/(divisor >>> 0)) >>> 0;
			remainder = ((remainder >>> 0) % (divisor >>> 0)) >>> 0;
			quotient += res << leftShift;

			remainder <<= 1;
			leftShift--;
		}
		quotient = quotient | 0;
		if (!positiveSign) {
			quotient *= -1;
		}
		return new FixedPoint(quotient | 0);
	}

	// input is non-negative
	static sqrt(a: FixedPoint): FixedPoint {
		let n: number = a.rawValue | 0;
		let x: number = n | 0;
		let c: number = 0 | 0;
		let d: number = 1 << 30;
		while ((d|0) > (n|0)) {
			d >>= 2;
		}
		while((d|0) != 0) {
			if ((x|0) >= (((c|0) + (d|0))|0)) {
				x = (x - (((c|0) + (d|0))|0)) | 0;
				c = ((c >> 1) + (d|0)) | 0;
			} else {
				c >>= 1;
			}
			d >>= 2;
		}
		return new FixedPoint(c << (FixedPoint.scaleShift >> 1));
	}
}
