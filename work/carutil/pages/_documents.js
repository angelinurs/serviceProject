import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps( ctx ) {
        const initialProps = await Document.getInitialProps( ctx );
        return {
            ...initialProps
        }
    }

    render()    {

        return (
          <Html lang='ko'>
            <Head title='Dash board'>                
                <meta charSet='utf-8' name="description" content="nextjs interlock with spring-boot" />
                <link rel="icon" href="/favicon.ico" />
            </Head >
            <body>

              <Main />
              <NextScript />

            </body>
          </Html>
        );
    }
}

export default MyDocument;