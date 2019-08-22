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

  it("should return complex object", () => {
    var uriobj = formurldecoded('data=%5B%7B%22e%22%3A%7B%22et%22%3A%22shop%22%2C%22ref%22%3A%22%24pageName%24%3Fv%3D8%26id%3Durl%26event%3DVIEW%26time%3D1564394439489%26idlist%3Diid%22%2C%22t%22%3A1564394439489%2C%22spm%22%3A%22H5.b.c.d.95025060%22%2C%22referer%22%3A%22%22%7D%7D%5D');

    expect(
      uriobj.data
    ).toBe(
      '[{"e":{"et":"shop","ref":"$pageName$?v=8&id=url&event=VIEW&time=1564394439489&idlist=iid","t":1564394439489,"spm":"H5.b.c.d.95025060","referer":""}}]'
    );
  });

  it("should return decoded data", () => {
    expect(
      formurldecoded(
        'propStr1=str1&propStr2=str2'
      )   
    ).toEqual({
      propStr1: 'str1',
      propStr2: 'str2'
    });
  });

  it("should return decoded data, with array properties", () => {
    expect(
      formurldecoded(
        'propStr1=str1&propStr2=str2&propArr1%5B0%5D=arrStr1&propArr1%5B1%5D=arrStr2'
      )   
    ).toEqual({
      propStr1: 'str1',
      propStr2: 'str2',
      propArr1: ['arrStr1', 'arrStr2']
    });
  });

  it("should return decoded data, with object properties", () => {
    expect(
      formurldecoded(
        'propStr1=str1&propStr2=str2&propObj1%5BobjPropStr1%5D=objStr1&propObj1%5BobjPropStr2%5D=objStr2'
      )   
    ).toEqual({
      propStr1: 'str1',
      propStr2: 'str2',
      propObj1: {
        objPropStr1: 'objStr1',
        objPropStr2: 'objStr2'
      }
    });
  });

  it("should return decoded data, with mixed object and array properties", () => {
    expect(
      formurldecoded(
        'propStr1=str1&propStr2=str2&propObj1%5BobjPropStr1%5D=objStr1&propObj1%5BobjPropStr2%5D=objStr2&propObj1%5BobjPropObj1%5D%5BpropObj1Str1%5D=obj1Str1&propObj1%5BobjPropArr1%5D%5B0%5D%5BpropArr1Obj1Str1%5D=obj1Str1&propObj1%5BobjPropArr1%5D%5B1%5D%5BpropArr1Obj2Str1%5D=obj2Str1'
      )   
    ).toEqual({
      propStr1: 'str1',
      propStr2: 'str2',
      propObj1: {
        objPropStr1: 'objStr1',
        objPropStr2: 'objStr2',
        objPropObj1: {
          propObj1Str1: 'obj1Str1'
        },
        objPropArr1: [{
          propArr1Obj1Str1: 'obj1Str1'
        }, {
          propArr1Obj2Str1: 'obj2Str1'
        }]
      }
    });
  });

  it("should return decoded data, with numbers", () => {
    expect(
      formurldecoded(
        'propArr1%5B0%5D=1&propArr1%5B1%5D=2&propArr1%5B2%5D=3'
      )   
    ).toEqual({ propArr1: [1, 2, 3] });
  });

  it("should return decoded data, with booleans", () => {
    expect(
      formurldecoded(
        'propArr1%5B0%5D=true&propArr1%5B1%5D=false&propArr1%5B2%5D=true'
      )   
    ).toEqual({ propArr1: [true, false, true] });
  });

  it("should return decoded data, with null", () => {
    expect(
      formurldecoded(
        'propNull1=null&propStr1=str1'
      )   
    ).toEqual({ propNull1: null, propStr1: 'str1' });
  });
  
  it("should not break when null argument is given", () => {
    expect(
      formurldecoded(null)
    ).toEqual({});

    expect(
      formurldecoded(undefined)
    ).toEqual({});
  });

  /*
  it("should return decoded empty array", () => {
    expect(
      formurldecoded('emptyArr%5B%5D')
    ).toEqual({ emptyArr: [] });
  });

  it("should return decoded empty array inside an object", () => {
    expect(
      formurldecoded('parent%5Bfoo%5D=bar&parent%5BemptyArr%5D%5B%5D')
    ).toEqual({ parent: { foo: 'bar', emptyArr: [] } });
  });
  */
});

