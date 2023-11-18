"use client"

import { useState } from "react"

import { Button, Form, Segment } from "semantic-ui-react"

function CollaboratorsNew({ reloadPage }) {
    const [collaboratorsNewData, setCollaboratorsNewData] = useState({
        name: "", 
        company_id: "",
        cpf: ""
    })

    const handleInput = event => {
        const { name, value } = event.target

        setCollaboratorsNewData(prev => ({ ...prev, [name]: value }))
    }

    const newValidator = async () => {
        try {
            const response = await fetch("http://localhost:3008/api/collaborators", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(collaboratorsNewData),
            });
      
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.status}`);
            }
      
            const data = await response.json();
            console.log("Resposta da API:", data);
            
            reloadPage()
            // Lógica adicional aqui se necessário
        } catch (error) {
            console.error("Erro durante a solicitação:", error);
        }

        setCollaboratorsNewData({
            name: "", 
            company_id: "", 
            cpf: ""
        })
    }

    const {
        name, 
        company_id, 
        cpf
    } = collaboratorsNewData

    return (
        <>
            <h4>NEW COLLABORATOR</h4>
            <Segment> 
                <Form>
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
                    <Button onClick={newValidator} type='submit'>New</Button>
                </Form>
            </Segment>
        </>
    )
}

export default CollaboratorsNew