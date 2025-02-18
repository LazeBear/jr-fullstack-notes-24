// describe(); -> category "test function foo"  - can be nested
// it('should do something')/ test() -> test case 测试用例
// expect(resultValue).toBe(expectedValue)  - assertion

// describe('function foo', ()=>{
//   it("should xxxxx", ()=>{

//   })

//   describe()
//   describe()
// })

// posts.test.js
// - posts/
// - get.test.js

function sum(a, b) {
  return a + b;
}

describe('sum function', () => {
  it('should return correct sum of two numbers', () => {
    // setup
    const a = 1;
    const b = 2;
    // execute
    const result = sum(a, b);
    // compare
    expect(result).toBe(a + b);
  });
});
