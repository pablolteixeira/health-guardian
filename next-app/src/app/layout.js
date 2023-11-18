import 'semantic-ui-css/semantic.min.css'

import { Container } from 'semantic-ui-react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Container textAlign="center" verticalAlign="middle">
          <body>{children}</body>
        </Container>
    </html>
  )
}
