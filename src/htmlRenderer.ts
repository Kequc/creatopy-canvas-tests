import { readFile } from 'fs/promises';
import { join } from 'path';
import Mustache from 'mustache';

const cache = new Map<string, string>();

type THtmlPayload = {
    name: string;
    view: { [key: string]: any };
};

async function htmlRenderer (payload: unknown, { res }) {
    const { name, view } = payload as THtmlPayload;

    const template = await getTemplate(name);
    const partials = await getPartials();
    const html = Mustache.render(template, view, partials);

    res.end(html);
}

export default htmlRenderer;

export function useHtml ({ res }) {
    res.setHeader('Content-Type', 'text/html');
}

async function getTemplate (location: string): Promise<string> {
    if (!cache.has(location)) {
        const file = await readFile(join(__dirname, 'templates', location + '.mustache'), 'utf-8');
        cache.set(location, file);
    }

    return cache.get(location)!;
}

async function getPartials () {
    return {
        header: await getTemplate('partials/header'),
        footer: await getTemplate('partials/footer')
    };
}
