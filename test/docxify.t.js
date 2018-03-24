'use strict';

import fs from 'fs';
import path from 'path';
import test from 'ava';
import execa from 'execa';

test.beforeEach(t => {
  t.context.testMd = path.resolve('./test/fixtures/docxify.md');
  t.context.testDocx = path.resolve('./test/fixtures/docxify.docx');
});

test.afterEach(t => {
  const file = t.context.testDocx;

  fs.access(file, fs.constants.F_OK, err => {
    if (!err) {
      fs.unlinkSync(file);
    }
  });
});

test('docxify', async t => {
  t.plan(3);

  const result = await execa('docxify', [t.context.testMd, '--silent']);
  const docxExists = fs.existsSync(t.context.testDocx);

  t.true(docxExists, `${t.context.testDocx} not created`);

  t.is(result.cmd, `docxify ${t.context.testMd} --silent`);
  t.is(result.failed, false);
});
