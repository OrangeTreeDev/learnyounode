const Writable = require('stream').Writable;
const inherit = require('./inherit');

function ConcatStream (opt, cb) {
  if(!(this instanceof ConcatStream)) return new ConcatStream(opt, cb);
  
  if(typeof opt === 'function') {
    cb = opt;
    opt = {};
  }
  
  if(!opt) opt = {};

  let encoding = opt.encoding;
  let shouldInferEncoding = false;
  if(!encoding) {
    shouldInferEncoding = true;
  } else {
    encoding = String(this.encoding).toLocaleLowerCase;
  }
  this.encoding = encoding;
  this.shouldInferEncoding = shouldInferEncoding;

  // 非对象模式下，仅支持String, Buffer, Uint8Array
  Writable.call(this, {objectMode: true});
  this.body = [];

  if(cb && typeof cb === 'function') {
    // 缓冲数据已传给底层系统
    this.on('finish', () => {
      cb(this.getBody());
    });
  }
}
inherit(ConcatStream, Writable);

ConcatStream.prototype._write = function(chunk, encoding, next) {
  this.body.push(chunk);
  next();
}

ConcatStream.prototype.inferEncoding = function(chunk) {
  let encoding = 'buffer';
  if(!chunk) return encoding;
  if(typeof chunk === 'string') {
    encoding = 'string';
  } else if (Buffer.isBuffer(chunk)) {
    encoding = 'buffer';
  } else if (chunk instanceof Uint8Array) {
    encoding = 'uint8array';
  } else if (Array.isArray(chunk)) {
    encoding = 'array';
  } else if (typeof chunk === 'object') {
    encoding = 'object';
  }
  return encoding;
}

ConcatStream.prototype.getBody = function() {
  if(this.shouldInferEncoding) this.encoding = this.inferEncoding(this.body[0]);
  if(this.encoding === 'string') return concatString(this.body);
}

function concatString (data) {
  var chunks = [];
  for (let i = 0; i < data.length; i++) {
    if(typeof data[i] === 'string') {
      chunks.push(data[i]);
    } else if (Buffer.isBuffer(data[i])) {
      chunks.push(data[i]);
    } else {
      chunks.push(Buffer.from(String(data[i])));
    }
  }
  if(typeof chunks[0] === 'string') {
    chunks = chunks.join('');
  } else {
    chunks = Buffer.concat(chunks).toString('utf8');
  }
  return chunks;
}

module.exports = ConcatStream;