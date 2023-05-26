import { Html, Head, Main, NextScript } from 'next/document'

// // Define a custom Document for the application
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        {/*NextScript tag from next/document. This injects Next.js scripts into the HTML
        It enables functionalities like client-side navigation, development error handling, etc.*/}
        <NextScript />
      </body>
    </Html>
  )
}