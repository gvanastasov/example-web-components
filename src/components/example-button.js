const jss = require('jss').default

const TYPES = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
} 

class ExampleButton extends HTMLButtonElement {
    constructor() {
        super();
    }

    static stylesheet = undefined

    static name = 'example-button'

    static get styles() {
        return {
            [ExampleButton.name]: {
                padding: '8px 12px',
                'min-width': '120px',
                'border-radius': '30px',
                'transition': 'background-color 0.2s'
            },
            [`${ExampleButton.name}--primary`]: {
                color: 'black',
                'background-color': '#a6c6ff',
                border: '2px solid #fff',
                '&:hover': {
                    background: 'cornflowerblue'
                },
            },
            [`${ExampleButton.name}--secondary`]: {
                color: 'black',
                border: '2px solid #a6c6ff',
                '&:hover': {
                    background: 'cornflowerblue'
                },
            }
        }
    }

    static get observedAttributes() { 
        return ['type']
    }

    props = {
        type: TYPES.PRIMARY
    }

    events = {
        click: undefined
    }

    connectedCallback() {
        this.nextTick(() => this.bindEvents())
        this.setProps()
        this.applyStyle();
    }

    disconnectedCallback() {
        this.unbindEvents();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'type') {
            const { classes } = ExampleButton.stylesheet

            this.classList.remove(classes[`${ExampleButton.name}--${oldValue}`])
            this.classList.add(classes[`${ExampleButton.name}--${newValue}`])
        }
    }

    applyStyle() {
        if (!ExampleButton.stylesheet) {
            ExampleButton.stylesheet = jss.createStyleSheet(ExampleButton.styles).attach()
        }
        const { classes } = ExampleButton.stylesheet

        this.classList.add(classes[ExampleButton.name]);
        this.classList.add(classes[`${ExampleButton.name}--${this.props.type}`])
    }

    nextTick(callback) {
        return setTimeout(callback)
    }

    setProps() {
        Object.keys(this.props).forEach(p => {
            this.props[p] = this.getAttribute(p) || this.props[p]
        })
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