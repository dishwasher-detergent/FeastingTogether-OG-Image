
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/Nunito_VariableFont_wght.ttf`).toString('base64');
const main = readFileSync(`${__dirname}/../_fonts/Letter_Magic.ttf`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Nunito';
        src: url(data:font/ttf;charset=utf-8;base64,${rglr}) format('ttf');
    }

    @font-face {
        font-family: 'Magic';
        src: url(data:font/ttf;charset=utf-8;base64,${main}) format('ttf');
    }

    body {
        background: #f1f5f9;
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: Nunito, sans-serif;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .logo-wrapper {
        padding: 2rem;
    }

    .logo-text {
        font-size: 1.5rem;
        font-family: Magic, sans-serif;
    }

    .code-wrapper {
        padding: 2rem;
        text-align: left;
    }

    .code-label {
        font-weight: bold;
        font-size: 2rem;
        padding: 0 0 .5rem 2rem;
        margin: 0;
    }

    .code-text {
        font-weight: bold;
        font-size: 10rem;
        padding: 0rem 1.5rem;
        border-radius: 2rem;
        background-color: white;
        margin: 0;
        border: solid 1px #cbd5e1;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="wrapper">
            <div class="logo-wrapper">
                <img
                    class="logo"
                    alt="Feasting Together Logo"
                    src="https://www.feastingtogether.com/Branding/Logo.png"
                    width="auto"
                    height="225"
                    />
                <p class="logo-text">Feasting Together</p>
            </div>
            <div class="code-wrapper">
                <p class="code-label">Invite Code:</p>
                <h1 class="code-text">${sanitizeHtml(text)}</h1>
            </div>
        </div>
    </body>
</html>`;
}
