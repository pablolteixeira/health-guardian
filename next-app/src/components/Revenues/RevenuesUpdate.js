"use client"

import { useState, useEffect } from "react"

import { Button, Form, Segment, Dropdown } from "semantic-ui-react"

import convertArrayToObject from "@/utils/convertArrayToObject";

function RevenuesUpdate({ reloadPage }) {
    const [dropdownId, setDropdownId] = useState("choice")
    const [queryObject, setQueryObject] = useState({}) 
    const [dropdownArray, setDropdownArray] = useState([])

    const [revenuesUpdateData, setRevenuesUpdateData] = useState({
        id: "",
        company_id: "", 
        value: "", 
        data: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/revenues');
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

        setRevenuesUpdateData(prev => ({ ...prev, [name]: value }))
    }

    const updateRevenues = async () => {
        try {
            const response = await fetch("http://localhost:3008/api/revenues", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(revenuesUpdateData),
            });
      
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.status}`);
            }
      
            const data = await response.json();
            console.log("Resposta da API:", data);
        
            // Lógica adicional aqui se necessário

            setDropdownId("choice")

            setRevenuesUpdateData({
                id: "",
                company_id: "", 
                value: "", 
                data: "" 
            })

            reloadPage()
        } catch (error) {
            console.error("Erro durante a solicitação:", error);
        }
    }

    const handleDropdown = (event, data) => {
        const dropdownId = data.value

        setRevenuesUpdateData({
            id: dropdownId,
            company_id: queryObject[dropdownId].company_id, 
            value: queryObject[dropdownId].value,
            data: queryObject[dropdownId].data,
        })

        setDropdownId(data.value)
    }

    const {
        company_id, 
        value, 
        data
    } = revenuesUpdateData

    return (
        <>
            <h4>UPDATE REVENUE</h4>
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
                                    <Button onClick={updateRevenues} type='submit'>Update</Button>
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

export default RevenuesUpdate