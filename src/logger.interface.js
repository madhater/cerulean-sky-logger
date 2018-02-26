class LoggerInterface {
    constructor() {
        this.logger = console;
        this.logLevel = 'ERROR';
        this.prefix = true;
    }

    setLogger(myLogger, myLogLevel, myPrefix) {
        if( myLogger &&
            myLogger.info && typeof myLogger.info === 'function' &&
            myLogger.warn && typeof myLogger.warn === 'function' &&
            myLogger.error && typeof myLogger.error === 'function'
        ){
            this.logger = myLogger;

        } else if(myLogger && typeof myLogger === 'function'){
            this.logger = {
                info: myLogger,
                warn: myLogger,
                error: myLogger
            };
        } else {
            this.logger.error('setLogger: invalid logger passed');
        }

        if(myLogLevel && (myLogLevel === 'INFO' || myLogLevel === 'WARNING' || myLogLevel === 'ERROR')){
            this.logLevel = myLogLevel;
        } else if(myLogLevel){
            this.logger.error('setLogger: invalid logger passed');
        }
        if(myPrefix === false)  this.prefix = false;
    }

    generateMethodSignatureMessage() {
        var r = [];
        for(let a = 0, aMax = arguments.length; a < aMax; a++){
            let type = typeof arguments[a];
            let value = type === 'object' ? generateObjectMinString(arguments[a], this.logLevel) : arguments[a];
            r.push(type + ':' + value);
        }
        return '\n    ' + r.join('\n    ');
    }
    
    info(message) {
        if(this.logLevel === 'ERROR' || this.logLevel === 'WARNING') return;
        if(this.prefix) {
            this.logger.info('INFO: ' + message);
        } else {
            this.logger.info( message);
        }
        
    }

    warn(message) {
        if(this.logLevel === 'ERROR') return;
        if(this.prefix) {
            this.logger.warn('\x1b[33m%s\x1b[0m', 'WARNING: ' + message);
        } else {
            this.logger.warn('\x1b[33m%s\x1b[0m', message);
        }
        
    }

    error(message) {
        if(this.prefix) {
            this.logger.error('\x1b[31m%s\x1b[0m', 'ERROR: ' + message);
        } else {
            this.logger.error('\x1b[31m%s\x1b[0m', message);
        }
        
    }
};

var generateObjectMinString = (object, logLevel) => {
    if(logLevel === 'DEBUG'){
        return JSON.stringify(object);
    } else {
        var r = [];
        for(var key in object){
            r.push(typeof object[key] + ':' + key);
        }
        r.join(', ');
        return '{ ' + r + ' }';
    }
};

module.exports = LoggerInterface;
