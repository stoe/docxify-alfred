'use strict';

const path = require('path');
const alfy = require('alfy');
const DOCXify = require('docxify-node');

const source = alfy.input;

if (!source) {
  alfy.error('error.');
}

const destination = path.resolve(
  source.slice(0, source.indexOf('.md')) + '.docx'
);

const docxify = new DOCXify({
  source: path.resolve(source),
  destination,
  open: false,
  silent: true
});
docxify.makeDocx();
