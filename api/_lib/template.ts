
import { readFileSync } from 'fs';
import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: #f1f5f9;
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        padding-bottom: 2rem;
    }

    .logo {
        margin: 0 75px;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        color: black;
    }

    .heading .title {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .heading .code {
        margin: 0;
        padding: 0;
        font-size: 7rem;
        font-weight: bold;
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
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
                <img
                    class="logo"
                    alt="Feasting Together Logo"
                    src="https://www.feastingtogether.com/Branding/Logo.png"
                    width="auto"
                    height="225"
                />
            </div>
            <div class="spacer">
            <div class="heading">
            <p class="title">Invite Code</p>
            <p class="code">
                ${sanitizeHtml(text)}
            </p>
            </div>
        </div>
    </body>
</html>`;
}
