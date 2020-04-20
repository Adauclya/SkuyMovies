class AppHeader extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            .header-left{
                float: left;
            }

            @media screen and (max-width: 768px) {
                .header-left{
                    float: none;
                    margin: 0;
                    padding: 0;
                    display: none;
                }
            }

        </style>
        <div class="header-left">
            <icon-logo src="./assets/img/log1.png" width ="200px" height="50px"></icon-logo>
        </div>
        `
    }
}

customElements.define("app-header", AppHeader);
