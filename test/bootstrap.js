const puppeteer = require('puppeteer');
const server = require("./testServer");
const fs = require("fs");
const path = require("path")


const optsSlow = {
    headless: false,
    slowMo: 100,
    timeout: 10000
};

// puppeteer options
const optsFast = {
    headless: true,
    timeout: 10000
};

global.page = undefined;

// expose variables
before (async function () {
    const underTest = fs.readFileSync(path.resolve(__dirname,'../src/sandboxed-script.js')).toString();
    fs.writeFileSync(path.resolve(__dirname,'context/sandboxed-script.js'),underTest);
    global.browser = await puppeteer.launch(optsFast);
    global.page = await browser.newPage();
    await global.page.goto('http://localhost:8080');
});

// close browser and reset global variables
after (function () {
    server.closeServer();
    browser.close();
});