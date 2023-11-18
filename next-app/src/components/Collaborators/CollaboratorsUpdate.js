"use client"

import { useState, useEffect } from "react"

import { Button, Form, Segment, Dropdown } from "semantic-ui-react"

import convertArrayToObject from "@/utils/convertArrayToObject";

function CollaboratorsUpdate({ reloadPage }) {
    const [dropdownId, setDropdownId] = useState("choice")
    const [queryObject, setQueryObject] = useState({}) 
    const [dropdownArray, setDropdownArray] = useState([])

    const [collaboratorUpdateData, setCollaboratorUpdateData] = useState({
        id: "",
        name: "", 
        company_id: "", 
        cpf: "", 
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/collaborators');
              const result = await response.json();
            
              setDropdownArray(result.map(query => ({ key: query.id, value: query.id, text: query.id })))
              setQueryObject(convertArrayToObject(result, "id"))
            } catch (e) {
              console.error('Error fetching data:', error);
            }
          }
      
          fetchData()
    }, [])

    const handleInput = event => {
        const { name, value } = event.target

        setCollaboratorUpdateData(prev => ({ ...prev, [name]: value }))
    }

    const updateCollaborator = async () => {
        try {
            const response = await fetch("http://localhost:3008/api/collaborators", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(collaboratorUpdateData),
            });
      
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.status}`);
            }
      
            const data = await response.json();
            console.log("Resposta da API:", data);
        
            // Lógica adicional aqui se necessário

            setDropdownId("choice")

            setCollaboratorUpdateData({
                id: "",
                name: "", 
                company_id: "", 
                cpf: "", 
            })

            reloadPage()
        } catch (error) {
            console.error("Erro durante a solicitação:", error);
        }
    }

    const handleDropdown = (event, data) => {
        const dropdownId = data.value

        setCollaboratorUpdateData({
            id: dropdownId,
            name: queryObject[dropdownId].name, 
            company_id: queryObject[dropdownId].company_id, 
            cpf: queryObject[dropdownId].cpf, 
        })

        setDropdownId(data.value)
    }

    const {
        name, 
        company_id, 
        cpf
    } = collaboratorUpdateData

    return (
        <>
            <h4>UPDATE COLLABORATORS</h4>
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
                                <>
                                    <Form.Field>
                                        <label>Name:</label>
                                        <input onChange={handleInput} name="name" value={name} placeholder='' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Company ID:</label>
                                        <input onChange={handleInput} name="company_id" value={company_id} placeholder='' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>CPF:</label>
                                        <input onChange={handleInput} name="cpf" value={cpf} placeholder='' />
                                    </Form.Field>
                                    <Button onClick={updateCollaborator} type='submit'>Update</Button>
                                </>
                            )
                        :
                            null
                    }
                </Form>
            </Segment>
        </>
    )
}

export default CollaboratorsUpdate