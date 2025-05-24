import { html } from "hono/html"
import { FC } from "hono/jsx"

const Layout: FC = (props) => {
  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>Auth</title>

          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
            rel='stylesheet'
          />
          <link
            rel='icon'
            type='image/x-icon'
            href='https://hono.dev/favicon.ico'
            sizes='16x16'
          />
          <link href='index.css' rel='stylesheet'></link>
          <script src='script.js' type='module'></script>
        </head>
        <body>
          <main class='w-full'>{props.children}</main>
        </body>
      </html>
    </>
  )
}

export default Layout
