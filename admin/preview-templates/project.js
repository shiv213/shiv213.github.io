import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Page = createClass({
    render() {
        const entry = this.props.entry;
        const icon = entry.getIn(["data", "icon"], null);

        return html`
            <main>
                <h1>${entry.getIn(["data", "title"], null)}</h1>
                ${icon
                    ? html`<img src=${this.props.getAsset(icon)} alt="" width="128" height="128" />`
                    : html`<h1>${entry.getIn(["data", "emoji"], null)}</h1>`}

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
