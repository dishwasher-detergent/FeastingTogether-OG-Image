
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/Nunito_VariableFont_wght.woff2`).toString('base64');
const main = readFileSync(`${__dirname}/../_fonts/Letter_Magic.woff2`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Nunito';
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Magic';
        src: url(data:font/woff2;charset=utf-8;base64,${main}) format('woff2');
    }

    body {
        background: #0f172a;
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: Nunito, sans-serif;
        color: white;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }

    .logo-wrapper {
        padding: 2rem;
    }

    .logo-text {
        margin-top: 0;
        font-size: 5rem;
        font-family: Magic, sans-serif;
    }

    .code-wrapper {
        padding: 2rem;
        text-align: left;
    }

    .code-label {
        font-weight: bold;
        font-size: 6rem;
        padding: 0 0 .5rem 2rem;
        margin: 0;
    }

    .code-text {
        font-weight: bold;
        font-size: 15rem;
        padding: 0rem 3rem;
        border-radius: 2rem;
        background-color: #1e293b;
        margin: 0;
        border: solid 1px #475569;
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
                    src="https://www.feastingtogether.com/Branding/Logo_Light.png"
                    width="auto"
                    height="500"
                    />
                <p class="logo-text">Feasting<br>Together</p>
            </div>
            <div class="code-wrapper">
                <p class="code-label">Invite Code:</p>
                <h1 class="code-text">${sanitizeHtml(text)}</h1>
            </div>
        </div>
    </body>
</html>`;
}
