import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Page = createClass({
    render() {
        const entry = this.props.entry;

        return html`
            <main>
                <h1>${entry.getIn(["data", "title"], null)}</h1>
                <h1>${entry.getIn(["data", "emoji"], null)}</h1>

                ${this.props.widgetFor("body")}
                <p>
                    ${
                            entry.getIn(["data", "tags"], []).map(
                                    tag =>
                                            html`
                                                <a href="#" rel="tag">${tag}</a>
                                            `
                            )
                    }
                </p>
            </main>
        `;
    }
});

export default Page;
