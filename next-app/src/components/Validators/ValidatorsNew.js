"use client"

import { useState } from "react"

import { Button, Form, Segment } from "semantic-ui-react"

function ValidatorsNew({ reloadPage }) {
    const [validatorNewData, setValidatorNewData] = useState({
        company_id: "", 
        competence: "", 
        lives: "", 
        revenue: "", 
        sinister: "", 
        accident_rate: ""
    })

    const handleInput = event => {
        const { name, value } = event.target

        setValidatorNewData(prev => ({ ...prev, [name]: value }))
    }

    const newValidator = async () => {
        try {
            const response = await fetch("http://localhost:3008/api/validators", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(validatorNewData),
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

        setValidatorNewData({
            company_id: "", 
            competence: "", 
            lives: "", 
            revenue: "", 
            sinister: "", 
            accident_rate: ""
        })
    }

    const {
        company_id, 
        competence, 
        lives, 
        revenue, 
        sinister, 
        accident_rate
    } = validatorNewData

    return (
        <>
            <h4>NEW VALIDATOR</h4>
            <Segment> 
                <Form>
                    <Form.Field>
                        <label>Company ID:</label>
                        <input onChange={handleInput} name="company_id" value={company_id} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Competence:</label>
                        <input onChange={handleInput} name="competence" value={competence} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Lives:</label>
                        <input onChange={handleInput} name="lives" value={lives} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Revenue:</label>
                        <input onChange={handleInput} name="revenue" value={revenue} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Sinister:</label>
                        <input onChange={handleInput} name="sinister" value={sinister} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Accident Rate:</label>
                        <input onChange={handleInput} name="accident_rate" value={accident_rate} placeholder='' />
                    </Form.Field>
                    <Button onClick={newValidator} type='submit'>New</Button>
                </Form>
            </Segment>
        </>
    )
}

export default ValidatorsNew