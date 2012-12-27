
var cobs = require('../'),
    path = require('path'),
    assert = require('assert');
    
// compile program defined

assert.ok(cobs.compileProgram);

// data division

var program = cobs.compileProgram('data division.procedure division.return.');
assert.ok(program);
assert.notEqual(typeof program.data, 'undefined');

// working-storage section

var program = cobs.compileProgram('data division. working-storage section. procedure division.return.');
assert.ok(program);
assert.ok(program.data);
assert.notEqual(typeof program.data.working_storage, 'undefined');

// linkage section

var program = cobs.compileProgram('data division. linkage section. procedure division.return.');
assert.ok(program);
assert.ok(program.data);
assert.notEqual(typeof program.data.linkage, 'undefined');
