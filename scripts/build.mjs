import { mkdir, copyFile, readFile, writeFile, cp } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
await mkdir('dist/assets', { recursive: true });
for (const file of ['index.html', 'styles.css']) await copyFile(`src/${file}`, `dist/${file}`);
await cp('src/assets', 'dist/assets', { recursive: true });
const ts = await readFile('src/app.ts', 'utf8');
await writeFile('dist/app.js', stripTypeScriptTypes(ts, { mode: 'strip' }));
await writeFile('dist/.nojekyll', '');
console.log('Sitio construido en dist/.');
