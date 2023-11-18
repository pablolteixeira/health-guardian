"use client"

import { useState } from "react"

import { Button, Form, Segment } from "semantic-ui-react"

function CompaniesNew({ reloadPage }) {
    const [companyNewData, setCompanyNewData] = useState({
        name: "", 
        operator: "", 
        broker: "", 
        cod_sinister: ""
    })

    const handleInput = event => {
        const { name, value } = event.target

        setCompanyNewData(prev => ({ ...prev, [name]: value }))
    }

    const newValidator = async () => {
        try {
            const response = await fetch("http://localhost:3008/api/companies", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(companyNewData),
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

        setCompanyNewData({
            name: "", 
            operator: "", 
            broker: "", 
            cod_sinister: ""
        })
    }

    const {
        name, 
        operator, 
        broker, 
        cod_sinister
    } = companyNewData

    return (
        <>
            <h4>NEW COMPANY</h4>
            <Segment> 
                <Form>
                    <Form.Field>
                        <label>Name:</label>
                        <input onChange={handleInput} name="name" value={name} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Operator:</label>
                        <input onChange={handleInput} name="operator" value={operator} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Broker:</label>
                        <input onChange={handleInput} name="broker" value={broker} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Sinister Code:</label>
                        <input onChange={handleInput} name="cod_sinister" value={cod_sinister} placeholder='' />
                    </Form.Field>
                    <Button onClick={newValidator} type='submit'>New</Button>
                </Form>
            </Segment>
        </>
    )
}

export default CompaniesNew