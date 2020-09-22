import Document, { Html, Head, Main, NextScript } from 'next/document'
import { readFileSync } from "fs"
import { join } from "path"

class InlineStylesHead extends Head {
    getCssLinks() {
        return this.__getInlineStyles()
    }

    __getInlineStyles() {
        const { assetPrefix, files } = this.context;
        if (!files || files.length === 0) return null

        return files.filter(file => /\.css$/.test(file)).map(file => (
            <style
                key={file}
                nonce={this.props.nonce}
                data-href={`${assetPrefix}/_next/${file}`}
                dangerouslySetInnerHTML={{
                    __html: readFileSync(join(process.cwd(), ".next", file), "utf-8")
                }}
            />
        ))
    }
}


class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
                <InlineStylesHead />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default CustomDocument