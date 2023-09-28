# FixedPointJS
This is the custom Q15.16 Fixed Point number class I created for use in my game, [BumperCoins](https://bumpercoins.io/).

It implements basic arithmetic operations and square root.

## The Files
1. FixedPoint.ts is the main file, the FixedPoint class
2. TestFixedPoint.ts is a test file that shows FixedPoint.ts usage
3. FixedPoint.txt is a file that's largely for myself where I workout and reason about the underlying math.

## Setup
Basically the FixedPoint.ts file is self-contained and can be copied as is into any TypeScript project.

Here's the commands I use to compile and run the tests on the command line:
```
tsc  --lib "dom, es6" *.ts
node TestFixedPoint.js
```
