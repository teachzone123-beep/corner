import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('asset sync creates a deduplicated typed static-import manifest',()=>{
  const root=process.cwd();
  const run=spawnSync(process.execPath,['scripts/sync-assets.mjs'],{cwd:root,encoding:'utf8'});
  assert.equal(run.status,0,run.stderr||run.stdout);
  const manifest=readFileSync(resolve(root,'assets/generated/userAssets.ts'),'utf8');
  const ids=[...manifest.matchAll(/^\s+"([^"]+)": \{/gm)].map(match=>match[1]);
  assert.equal(ids.length,new Set(ids).size,'asset identifiers should be unique');
  assert.match(manifest,/export const unknownAssets: string\[\]/);
  assert.match(manifest,/fallback:string/);
});

