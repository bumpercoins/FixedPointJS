# FixedPointJS
This is the custom Q15.16 Fixed Point number class I created for use in my game, [BumperCoins](https://bumpercoins.io/).

It implements basic arithmetic operations and square root.

## The Files
1. FixedPoint.ts is the main file, the FixedPoint class
2. TestFixedPoint.ts is a test file that shows FixedPoint.ts usage
3. FixedPoint.txt is a file that's largely for myself where I workout and reason about the underlying math.

## Setup
Basically the FixedPoint.ts file is self-contained and can be dropped into any TypeScript project.

Here's the commands I use to compile and run the tests on the command line:
```
tsc  --lib "dom, es6" *.ts
node TestFixedPoint.js
```

## License/Attributions
So I don't care how this particular FixedPoint code is used at all. That said, I did sort of port some code from FixedMath.Net/libfixmath (https://github.com/asik/FixedMath.Net), namely code for multiplication and division.  I also used square root code presented in [this Wikipedia article](https://en.m.wikipedia.org/wiki/Methods_of_computing_square_roots#Digit-by-digit_calculation). See FixedPoint.txt for my explanations and derivations for everything I used. While I don't believe short and simple Math algorithms can really be copyrighted, I'm not a lawyer so to be safe, I'll copy and paste the [License](https://github.com/asik/FixedMath.Net/blob/master/LICENSE.txt) from FixedMath.Net:

Copyright 2012 André Slupik

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

This project uses code from the libfixmath library, which is under the following license:

Copyright (C) 2012 Petteri Aimonen
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

This project uses code from the log2fix library, which is under the following license:

The MIT License (MIT)

Copyright (c) 2015 Dan Moulding

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


