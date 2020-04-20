class AppFooter extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <center>All Rights Reserved. 2020 &copy; Muhammad Syam Firdaus. SKUY-Movies</center>
        `
    }
}

customElements.define("app-footer", AppFooter);