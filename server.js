const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const dataFile = path.join(root, 'data', 'portfolio-seed.json');
const port = Number(process.env.PORT || 4177);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

function send(response, status, body, headers = {}) {
  response.writeHead(status, headers);
  response.end(body);
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    request.on('data', (chunk) => {
      size += chunk.length;
      if (size > 12 * 1024 * 1024) {
        reject(new Error('Request body is too large.'));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });

    request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    request.on('error', reject);
  });
}

async function handleApi(request, response) {
  if (request.method === 'GET') {
    const data = await fs.promises.readFile(dataFile, 'utf8');
    send(response, 200, data, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    return;
  }

  if (request.method === 'PUT') {
    const body = await readRequestBody(request);
    const parsed = JSON.parse(body);
    const formatted = `${JSON.stringify(parsed, null, 2)}\n`;
    const tempFile = `${dataFile}.tmp`;
    await fs.promises.writeFile(tempFile, formatted, 'utf8');
    await fs.promises.rename(tempFile, dataFile);
    send(response, 200, JSON.stringify({ ok: true }), {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    return;
  }

  send(response, 405, 'Method not allowed', { Allow: 'GET, PUT' });
}

function safeStaticPath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const requested = cleanPath === '/' ? '/index.html' : cleanPath;
  const filePath = path.normalize(path.join(root, requested));

  if (!filePath.startsWith(root)) return null;
  return filePath;
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

    if (url.pathname === '/api/portfolio') {
      await handleApi(request, response);
      return;
    }

    const filePath = safeStaticPath(url.pathname);
    if (!filePath) {
      send(response, 403, 'Forbidden');
      return;
    }

    const stat = await fs.promises.stat(filePath);
    if (!stat.isFile()) {
      send(response, 404, 'Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const body = await fs.promises.readFile(filePath);
    send(response, 200, body, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-store' : 'no-cache',
    });
  } catch (error) {
    const status = error.code === 'ENOENT' ? 404 : 500;
    send(response, status, status === 404 ? 'Not found' : 'Server error');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`TDRI Portfolio App is running at http://localhost:${port}/`);
});
