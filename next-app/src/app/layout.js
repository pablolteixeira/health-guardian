"use client"

import 'semantic-ui-css/semantic.min.css'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Container, Menu } from 'semantic-ui-react'

export default function RootLayout({ children }) {
  const [menuOption, setMenuOption] = useState("home")
  const router = useRouter()
  
  const handleClick = (event, { name }) => {
    setMenuOption(name)

    if (name === "home") {
      router.push("/")
    } else {
      router.push("/" + name)
    }
  }

  return (
    <html lang="en">
          <body>
            <Menu widths={6} style={{paddingBottom: "10px"}}>
              <Menu.Item
                name='home'
                active={menuOption === 'home'}
                onClick={handleClick}
              >
                🏠 Home
              </Menu.Item>

              <Menu.Item
                name='appointments'
                active={menuOption === 'appointments'}
                onClick={handleClick}
              >
                📋 Appointments
              </Menu.Item>

              <Menu.Item
                name='collaborators'
                active={menuOption === 'collaborators'}
                onClick={handleClick}
              >
                👥 Collaborators
              </Menu.Item>

              <Menu.Item
                name='companies'
                active={menuOption === 'companies'}
                onClick={handleClick}
              >
                🏢 Companies
              </Menu.Item>


              <Menu.Item
                name='revenues'
                active={menuOption === 'revenues'}
                onClick={handleClick}
              >
                💰 Revenues
              </Menu.Item>

              <Menu.Item
                name='validators'
                active={menuOption === 'validators'}
                onClick={handleClick}
              >
                👤 Validators
              </Menu.Item>
            </Menu>
    
            <Container textAlign="center" verticalAlign="middle">        
              {children}
            </Container>
          </body>
    </html>
  )
}
