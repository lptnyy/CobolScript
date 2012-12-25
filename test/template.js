
var cobs = require('../'),
    assert = require('assert');
    
function compile(text, ws) {
    var code = cobs.compileTemplate(text);
    var program = cobs.compileProgram(code);

    if (ws) {
        program.data = program.data || { };
        program.data.working_storage = ws;
    }
    
    var text = program.command.compile(program);
    return text;
}

// compileTemplate defined

assert.ok(cobs.compileTemplate);

// compile simple text

var text = compile("Hello");
assert.ok(text.indexOf('runtime.write("Hello");') >= 0);

// simple text with \r \n

var text = compile("Hello\r\nWorld");
assert.ok(text.indexOf('runtime.write("Hello\\r\\nWorld");') >= 0);

// simple text with quotes

var text = compile("Hello\"World\"");
assert.ok(text.indexOf('runtime.write("Hello\\\"World\\\"");') >= 0);

// embedded code

var text = compile("<# move 1 to a. #>", { a: null });
assert.ok(text.indexOf("ws.a = 1;") >= 0);
assert.ok(text.indexOf("display") == -1);

// text and embedded code

var text = compile("Hello <# move 1 to a #> world", { a: null });
assert.ok(text.indexOf("ws.a = 1;") >= 0);
assert.ok(text.indexOf('runtime.write("Hello ");') >= 0);
assert.ok(text.indexOf('runtime.write(" world");') >= 0);

// text with expression

var text = compile("Hello ${a}", { a: null });
assert.ok(text.indexOf('runtime.write("Hello ", ws.a);') >= 0);

// text with expression and text

var text = compile("Hello ${a} World", { a: null });
assert.ok(text.indexOf('runtime.write("Hello ", ws.a, " World");') >= 0);