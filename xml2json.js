var fs = require('fs')
var saxStream = require('sax').createStream(true, { lowercase: true, encoding: 'utf8' })

saxStream.on('error', function(error) {
  // unhandled errors will throw, since this is a proper node event emitter
  console.error(error)
  this._parser.error = null // clear the error
  this._parser.resume()
})

saxStream.on('text', function(text) {
  // if (text && text !== "") console.log(text)
  // stdout(text)
})

saxStream.on('opentag', function(tag) {
  let tagName = tag.name
  stdout(tagName)
})

saxStream.on('closetag', function(tagName) {
  // stdout(tagName)
})

saxStream.on('attribute', function(attr) {})

saxStream.on('end', function() {
  // parser stream is done, and ready to have more stuff written to it
  // stdout('The End.')
})

saxStream.on('comment', function(comment) {})

saxStream.on('cdata', function(data) {})

saxStream.on('doctype', function(text) {})

// pipe is supported, and it's readable/writable, same chunks coming in also go out
fs.createReadStream('data/pubmed-short.xml').pipe(saxStream)

function stdout(text) {
  process.stdout.write(text + '\n')
}
