const jss = require('jss').default

class ExampleButton extends HTMLButtonElement {
    constructor() {
        super();
    }

    static stylesheet = undefined

    static name = 'example-button'

    static get styles() {
        return {
            [ExampleButton.name]: {
                color: 'green'
            }
        }
    }

    events = {
        click: undefined
    }

    connectedCallback() {
        this.nextTick(() => this.bindEvents())
        this.applyStyle();
    }

    disconnectedCallback() {
        this.unbindEvents();
    }

    applyStyle() {
        if (!ExampleButton.stylesheet) {
            ExampleButton.stylesheet = jss.createStyleSheet(ExampleButton.styles).attach()
        }
        const { classes } = ExampleButton.stylesheet

        this.classList.add(classes[ExampleButton.name]);
    }

    nextTick(callback) {
        return setTimeout(callback)
    }
    
    bindEvents() {
        Object.keys(this.events).forEach(e => {
            const _eval = eval;
            const eventName = `on${e}`;
            const callback = this.getAttribute(eventName);

            if (callback) {
                const expression = _eval(callback);
                if (typeof (expression) === 'function') {
                    this.events[e] = this.addEventListener(e, expression);
                }
            }
        });
    }

    unbindEvents() {
        Object.keys(this.events).forEach(e => {
            if (e !== undefined) {
                this.removeEventListener(e, this.events[e]);
                this.events[e] = undefined;
            }
        });
    }
}

module.exports = ExampleButton