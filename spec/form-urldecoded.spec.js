// Filename: form-urldecoded.spec.js  
// Timestamp: 2016.04.28-13:20:22 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var formurldecoded = require('../');

describe("formurldecoded", () => {
  it("should decode a query string", () => {
    var uriobj = formurldecoded('www.myurl.com?param1=1&param2=two');

    expect(
      uriobj.param1 === 1 &&
        uriobj.param2 === 'two'
    ).toBe(true);
  });

  it("should not return a hash value by default", () => {
    var uriobj = formurldecoded('www.myurl.com?param1=1&param2=two#hash');

    expect(uriobj.hash).toBe(undefined);
  });

  // it("should return a hash when ishash param is true", () => {
  //     var uriobj = formurldecoded('www.myurl.com?param1=1&param2=two#hash', true);
  //
  //    expect(
  //        uriobj.hash === 'hash'
  //    ).toBe(true);
  // });

  it("should return complex object (not working)", () => {
    var uriobj = formurldecoded('data=%5B%7B%22e%22%3A%7B%22et%22%3A%22shop%22%2C%22ref%22%3A%22%24pageName%24%3Fv%3D8%26id%3Durl%26event%3DVIEW%26time%3D1564394439489%26idlist%3Diid%22%2C%22t%22%3A1564394439489%2C%22spm%22%3A%22H5.b.c.d.95025060%22%2C%22referer%22%3A%22%22%7D%7D%5D');

    expect(
      uriobj.data
    ).toBe(
      '[{"e":{"et":"shop","ref":"$pageName$?v=8&id=url&event=VIEW&time=1564394439489&idlist=iid","t":1564394439489,"spm":"H5.b.c.d.95025060","referer":""}}]'
    );
  });

  it("should return decoded data, with array properties", () => {

    const res = formurldecoded(
      'propStr1=str1&propStr2=str2&propArr1%5B0%5D=arrStr1&propArr1%5B1%5D=arrStr2'
    );
    
    expect(
      res
    ).toEqual({
      propStr1: 'str1',
      propStr2: 'str2',
      propArr1: ['arrStr1', 'arrStr2']
    });
  });
});

