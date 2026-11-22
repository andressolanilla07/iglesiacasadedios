import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.svg':'image/svg+xml' };
http.createServer(async (req,res) => {
  try {
    const pathname=decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const target=resolve(root, '.' + (pathname.endsWith('/') ? pathname+'index.html' : pathname));
    if (!target.startsWith(root+sep)) { res.writeHead(403); res.end(); return; }
    const content=await readFile(target);
    res.writeHead(200, { 'Content-Type':mime[extname(target)]||'application/octet-stream', 'X-Content-Type-Options':'nosniff', 'Cache-Control':'no-store' });
    res.end(content);
  } catch { res.writeHead(404); res.end('No encontrado'); }
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
