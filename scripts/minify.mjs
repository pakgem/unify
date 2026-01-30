#!/usr/bin/env node
/**
 * Minify static JS assets for jsDelivr/Webflow embeds.
 *
 * Outputs:
 *  - JS/global.min.js
 *  - JS/home.min.js (if JS/home.js exists)
 */

import fs from 'node:fs';
import path from 'node:path';
import { minify } from 'terser';

const ROOT = process.cwd();

async function minifyFile(inPath, outPath) {
  const code = fs.readFileSync(inPath, 'utf8');
  const result = await minify(code, {
    compress: {
      passes: 2,
      ecma: 2020,
    },
    mangle: true,
    format: {
      comments: false,
    },
  });

  if (!result.code) throw new Error(`terser produced no output for ${inPath}`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, result.code + '\n');
  const inSize = fs.statSync(inPath).size;
  const outSize = fs.statSync(outPath).size;
  console.log(`${path.relative(ROOT, inPath)} -> ${path.relative(ROOT, outPath)}  (${Math.round(inSize/1024)}KB -> ${Math.round(outSize/1024)}KB)`);
}

async function main() {
  const targets = [
    { in: path.join(ROOT, 'JS', 'global.js'), out: path.join(ROOT, 'JS', 'global.min.js') },
    { in: path.join(ROOT, 'JS', 'home.js'), out: path.join(ROOT, 'JS', 'home.min.js') },
  ];

  let ran = 0;
  for (const t of targets) {
    if (!fs.existsSync(t.in)) continue;
    await minifyFile(t.in, t.out);
    ran++;
  }

  if (!ran) {
    console.log('No JS targets found to minify.');
  }
}

main().catch((e) => {
  console.error(e?.stack || String(e));
  process.exit(1);
});
