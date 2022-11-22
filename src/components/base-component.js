class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.created();
    }
 
    // element is added to the document
    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    // element is removed from the document
    disconnectedCallback() {}

    // array of attribute names to monitor for changes
    static get observedAttributes() {
        return this.props;
    }

    // callback when an observed attribute is modified
    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    rendered = false; 

    // element created callback
    created() {}

    // element render function
    render() {}

    // element observable props
    props = []
}

module.exports = BaseComponent