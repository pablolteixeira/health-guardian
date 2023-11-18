"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [query, setQuery] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3008/api/validator');
        const result = await response.json();
        setQuery(result)
      } catch (e) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData()
  }, [])

  return (
    <main>
      {
        Object.keys(query).map((queryKey, index) => {
          const { user_id, username, email, registration_date } = query[queryKey]

          return (
            <div key={index}>
              <h2>Query: {index + 1}</h2>
              <h2>User ID: {user_id}</h2>
              <h2>Username: {username}</h2>
              <h2>Email: {email}</h2>
              <h2>Registration Date: {registration_date}</h2>
            </div>
          )
        })
      }
    </main>
  )
}
