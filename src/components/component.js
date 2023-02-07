class Test extends HTMLElement {
    name = 'another-test'
}

class Component {
    _options = undefined

    constructor(options) {
        this._options = options
    }

    create() {
        const { name } = this._options

        const componentProto = {
            name,
            connectedCallback() {
                console.log(`${this.name} connected`);
            }
        }

        function Definition() {
            // return Reflect.construct(HTMLElement, [], this.constructor)
        }

        Definition.prototype = Object.create(HTMLElement.prototype);
        Definition.prototype.constructor = Definition;

        Object.assign(Definition.prototype, componentProto);

        Object.setPrototypeOf(
            Definition.prototype, HTMLElement.prototype)

        return Definition;
    }

    register() {
        // var definition = this.create();

        const { name } = this._options

        function definition() {
            HTMLElement.call(this);
            this.name = name
            this.connectedCallback = function() {
                console.log(`${this.name} connected`);
            }

        }

        definition.prototype = Object.create(HTMLElement.prototype);
        definition.prototype.constructor = definition;

        Object.setPrototypeOf(
            definition.prototype, HTMLElement.prototype)

        console.log(definition)
        // console.log(new definition())
        console.log(Test)

        customElements.define(name, definition)
    }
}

module.exports = Component 