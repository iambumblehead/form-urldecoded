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

        expect(
            uriobj.hash === undefined
        ).toBe(true);
    });

    // it("should return a hash when ishash param is true", () => {
    //     var uriobj = formurldecoded('www.myurl.com?param1=1&param2=two#hash', true);
    //
    //    expect(
    //        uriobj.hash === 'hash'
    //    ).toBe(true);
    // });        
});

