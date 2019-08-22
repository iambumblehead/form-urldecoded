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

  it("should properly decode all ascii characters, other than '+'", () => {
    var testCharEncodingString = "";
    for (var i = 0; i < 256; i++) {
      testCharEncodingString += String.fromCharCode(i);
    }

    expect(
      formurldecoded(
        'test=%00%01%02%03%04%05%06%07%08%09%0A%0B%0C%0D%0E%0F%10%11%12%13%14%15%16%17%18%19%1A%1B%1C%1D%1E%1F+%21%22%23%24%25%26%27%28%29%2A%2B%2C-.%2F0123456789%3A%3B%3C%3D%3E%3F%40ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D%7E%7F%C2%80%C2%81%C2%82%C2%83%C2%84%C2%85%C2%86%C2%87%C2%88%C2%89%C2%8A%C2%8B%C2%8C%C2%8D%C2%8E%C2%8F%C2%90%C2%91%C2%92%C2%93%C2%94%C2%95%C2%96%C2%97%C2%98%C2%99%C2%9A%C2%9B%C2%9C%C2%9D%C2%9E%C2%9F%C2%A0%C2%A1%C2%A2%C2%A3%C2%A4%C2%A5%C2%A6%C2%A7%C2%A8%C2%A9%C2%AA%C2%AB%C2%AC%C2%AD%C2%AE%C2%AF%C2%B0%C2%B1%C2%B2%C2%B3%C2%B4%C2%B5%C2%B6%C2%B7%C2%B8%C2%B9%C2%BA%C2%BB%C2%BC%C2%BD%C2%BE%C2%BF%C3%80%C3%81%C3%82%C3%83%C3%84%C3%85%C3%86%C3%87%C3%88%C3%89%C3%8A%C3%8B%C3%8C%C3%8D%C3%8E%C3%8F%C3%90%C3%91%C3%92%C3%93%C3%94%C3%95%C3%96%C3%97%C3%98%C3%99%C3%9A%C3%9B%C3%9C%C3%9D%C3%9E%C3%9F%C3%A0%C3%A1%C3%A2%C3%A3%C3%A4%C3%A5%C3%A6%C3%A7%C3%A8%C3%A9%C3%AA%C3%AB%C3%AC%C3%AD%C3%AE%C3%AF%C3%B0%C3%B1%C3%B2%C3%B3%C3%B4%C3%B5%C3%B6%C3%B7%C3%B8%C3%B9%C3%BA%C3%BB%C3%BC%C3%BD%C3%BE%C3%BF'
      )
    ).toEqual({
        test: testCharEncodingString.replace(/\+/, ' ')
    });
  });

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

  it("should return decoded array inside an object with index", () =>
    expect(
      formurldecoded('parent%5Bfoo%5D=bar&parent%5BemptyArr%5D%5B0%5D=first&parent%5BemptyArr%5D%5B1%5D=second')
    ).toEqual({
      parent: {
        foo: 'bar',
        emptyArr: ['first', 'second']
      }
    })
  );

  it("should return decoded array inside an object without index", () =>
    expect(
      formurldecoded('parent%5Bfoo%5D=bar&parent%5BemptyArr%5D%5B%5D=first&parent%5BemptyArr%5D%5B%5D=second')
    ).toEqual({
      parent: {
        foo: 'bar',
        emptyArr: ['first', 'second']
      }
    })
  );

  it("should return array with index", () =>
    expect(
      formurldecoded('key%5B0%5D=val1')
    ).toEqual({
        key: ['val1']
    })
  );

  it("should return array without index", () =>
    expect(
      formurldecoded('key%5B%5D=val1')
    ).toEqual({
        key: ['val1']
    })
  );

  it("should return decoded urls with unicode characters", () =>
     expect(
      formurldecoded('parent%5Bfoo%5D=%F0%9F%98%80')
     ).toEqual({
        parent: {
          foo: '😀'
        }
     })       
   );
});

