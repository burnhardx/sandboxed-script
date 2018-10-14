const should = require("chai").should();

describe('sandboxed-script', function () {

    it('should have the correct page title', async() => {
        const title = await page.title();
        title.should.equal('Testcontext for sandboxed-script')
    });

    const infectedScript = "underscore_infected.js";
    const exportedName = "_";

    it("can be created by document", async() => {

        await page.evaluate((src, name) => {
            const scriptTag = document.createElement('sandboxed-script');
            scriptTag.setAttribute("src", src)
            scriptTag.setAttribute("name", name);
            document.body.appendChild(scriptTag);
        }, infectedScript, exportedName);

        const attributes = await page.$eval('sandboxed-script', node => {
            return {
                src: node.getAttribute('src'),
                name: node.getAttribute('name')
            }
        });
        attributes.src.should.equal(infectedScript);
        attributes.name.should.equal(exportedName);
    })


    it("contains an iframe with the given script", async ()=>{
        const iframeAttributes = await page.$eval('sandboxed-script > iframe', node => {
            return {
                srcdoc: node.getAttribute('srcdoc'),
                name: node.getAttribute('name'),
                src: node.getAttribute('src')
            }
        });
        iframeAttributes.src.should.equal('sandbox.html');
        iframeAttributes.name.should.equal(exportedName);
    })

    it("containing iframe is invisible", async ()=>{
        const iframeCssDisplay = await page.$eval('sandboxed-script > iframe', node => node.style.display);
        iframeCssDisplay.should.equal('none')
    })

});