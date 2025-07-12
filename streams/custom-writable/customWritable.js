const { Writable } = require("node:stream");
const fs = require("node:fs")
/**
 * Implementing a writeable stream.
 * 
 * https://nodejs.org/api/stream.html#implementing-a-writable-stream
 */
class FileWriteStream extends Writable {
    constructor({highWaterMark, fileName}) {
        super({ highWaterMark });

        this.fileName = fileName;
        this.fd = null; // file descriptor
        this.chunks = [];
        this.chunksSize = 0;
        this.writesCount = 0;
    }

    // This will run after constructor. it is step 1.
    _construct(callback) {
        fs.open(this.fileName, 'w', (err, fd) => {
            if (err) {
                callback(err) // Call this function (optionally with an error argument) when the stream has finished initializing.
            } else {
                this.fd = fd
                callback();
            }
        });

    }

    // Node's writable class is for handling writes but actual writing is for _write
    _write(chunk, encoding, callback) {
        this.chunks.push(chunk);
        this.chunkSize += chunk.length;

        if (this.chunkSize > this.writableHighWaterMark) {
            fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
                if (err) {
                    return callback(err);
                }
                this.chunks = [];
                this.chunksSize = 0;
                ++this.writesCount; // but in C++, this is iterating then returning the value while the opposite takes the current value, iterates, then returns the new value.
                // The internal representation and operations for ++i and i++ on numbers are essentially identical in terms of performance. There's no observable difference in speed.
                callback();
            })
        } else {
            callback();
        }
    }

    _final(callback) {
        fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
            if (err) return callback(err);

            this.chunks = [];
            callback();
        })
    }

    _destroy(error, callback) {
        console.log("Number of writes: ", this.writesCount);
        if (this.fd) {
            fs.close(this.fd, (err) => {
                callback(err || error);
            })
        } else {
            callback(error)
        }
    }

}
const stream = new FileWriteStream({highWaterMark: 1800, fileName: "text.txt" });

// const stream2 = fs.createWriteStream(); Node's impl

stream.write(Buffer.from("this is some string."));
stream.end(Buffer.from("Our last write."));
stream.on('finish', () => {
    console.log("Stream was finish");
})