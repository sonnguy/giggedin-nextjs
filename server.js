/* eslint-disable no-return-await */
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 9900;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    const server = express();

    server.get('/experience/[slug]', async (req, res) => {
        return await app.render(req, res, '/experience', { slug: req.params.slug });
    });

    server.get('/about-us/[slug]', async (req, res) => {
        return await app.render(req, res, '/about-us', { slug: req.params.slug });
    });

    server.get('*', async (req, res) => {
        return await handle(req, res)
    });

    server.listen(port, err => {
        if (err) throw err;
        // eslint-disable-next-line no-console
        console.log(`> Ready on http://localhost:${port}`);
    });
});
