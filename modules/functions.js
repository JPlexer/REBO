//functions.js

    module.exports = {
        description: "Functions for Basic Commands",
        getRandom: 
            function () {
                if (args.length == 1) {
                    if (typeof args[0] == Array) {
                        var random = Math.floor(Math.random() * 1000) % args[0].length;
                        return args[0][random];
                    }
                } else {
                    var random = Math.floor(Math.random() * 1000) % args.length;
                    return args[random];
                }
            
        },
    }
