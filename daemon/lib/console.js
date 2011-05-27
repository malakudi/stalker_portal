
var out = {};

var old_console = console;

for(var method in console){
    if (console.hasOwnProperty(method)){
        out[method] = console[method];
    }
}

out.log = function (d) {
    process.stdout.write('[' + new Date().toString() + '] ');
    old_console.log(d);
};

out.error = function (d) {
    process.stderr.write('[' + new Date().toString() + '] ');
    old_console.error(d);
};


module.exports = out;