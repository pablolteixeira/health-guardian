"use client"

import { useState } from "react"

import { Button, Form, Segment } from "semantic-ui-react"

function RevenuesNew({ reloadPage }) {
    const [revenuesNewData, setRevenuesNewData] = useState({
        company_id: "", 
        value: "", 
        data: ""
    })

    const handleInput = event => {
        const { name, value } = event.target

        setRevenuesNewData(prev => ({ ...prev, [name]: value }))
    }

    const newRevenue = async () => {
        try {
            const response = await fetch("http://localhost:3008/api/revenues", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(revenuesNewData),
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

        setRevenuesNewData({
            company_id: "", 
            value: "", 
            data: ""
        })
    }

    const {
        company_id, 
        value, 
        data
    } = revenuesNewData

    return (
        <>
            <h4>NEW REVENUE</h4>
            <Segment> 
                <Form>
                    <Form.Field>
                        <label>Company ID:</label>
                        <input onChange={handleInput} name="company_id" value={company_id} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Value:</label>
                        <input onChange={handleInput} name="value" value={value} placeholder='' />
                    </Form.Field>
                    <Form.Field>
                        <label>Data:</label>
                        <input onChange={handleInput} name="data" value={data} placeholder='' />
                    </Form.Field>
                    <Button onClick={newRevenue} type='submit'>New</Button>
                </Form>
            </Segment>
        </>
    )
}

export default RevenuesNew