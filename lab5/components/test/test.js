export class TestComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return (
            `
            <h1>Managers</h1>
        `
        )
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}