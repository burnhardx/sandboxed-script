class SandboxedScript extends HTMLElement {
    connectedCallback(){
        this.name = this.getAttribute('name');
        this.src= this.getAttribute('src');

        const iframe = document.createElement('iframe');
        iframe.setAttribute('name',this.name);
        iframe.setAttribute('src','sandbox.html');
        iframe.style.display='none';

        this.appendChild(iframe);
    }
}

if (!window.customElements) {
    customElements.define('sandboxed-script', SandboxedScript);
} else {
    window.customElements.define('sandboxed-script', SandboxedScript);
}