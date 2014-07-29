var test = require('tap').test;
var figc = require('../');

test('custom merge', function (t) {
    t.deepEqual(
        figc(__dirname + '/deep.json', [ '--foo.x', '5' ], {mergeImplementation: function () { return "foo"; }}),
        "foo"
    );
    
    t.deepEqual(
        figc(__dirname + '/deep.json', [ '--foo.x', '5' ], {mergeImplementation: function (a, b) { return a; }}),
        {
            "beep" : "boop",
            "foo" : { "bar" : { "baz" : "quux" } },
            "xs" : [ 1, 2, 3 ]
        }
    )
    
    t.deepEqual(
        figc(__dirname + '/deep.json', [ '--foo.x', '5' ], {mergeImplementation: function (a, b) { return b; }}),
        {
            "foo" : { "x" : 5 },
        }
    )
    
    t.end();
});
