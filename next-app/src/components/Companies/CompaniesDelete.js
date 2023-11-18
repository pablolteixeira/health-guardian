"use client"

import { useState, useEffect } from "react"

import { Button, Form, Segment, Dropdown } from "semantic-ui-react"

function CompaniesDelete({ reloadPage }) {
    const [reload, setReaload] = useState(0)

    const [dropdownId, setDropdownId] = useState("choice")

    const [dropdownArray, setDropdownArray] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/companies');
              const result = await response.json();
            
              setDropdownArray(result.map(query => ({ key: query.id, value: query.id, text: query.id })))
            } catch (e) {
              console.error('Error fetching data:', error);
            }
          }
      
          fetchData()
    }, [reload])

    const deleteCompany = async () => {
        try {
            const response = await fetch(`http://localhost:3008/api/companies/${dropdownId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.status}`);
            }
      
            const data = await response.json();
            console.log("Resposta da API:", data);
        
            // Lógica adicional aqui se necessário

            setReaload(reload + 1)
            setDropdownId("choice")
            reloadPage()
        } catch (error) {
            console.error("Erro durante a solicitação:", error);
        }
    }

    const handleDropdown = (event, data) => {
        setDropdownId(data.value)
    }

    return (
        <>
            <h4>DELETE COMPANY</h4>
            <Segment> 
                <Form>
                    <Dropdown 
                        placeholder="Choice"
                        fluid
                        selection
                        value={dropdownId}
                        options={dropdownArray}
                        onChange={handleDropdown}
                    />
                    <br />
                    {
                        dropdownId !== "choice" ?
                            (
                                <Button onClick={deleteCompany} type='submit'>Delete</Button>
                            )
                        :
                            null
                    }
                </Form>
            </Segment>
        </>
    )
}

export default CompaniesDelete