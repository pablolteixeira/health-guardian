"use client"

import { useState, useEffect } from "react"

import { Button, Form, Segment, Dropdown } from "semantic-ui-react"

import convertArrayToObject from "@/utils/convertArrayToObject";

function CompaniesUpdate({ reloadPage }) {
    const [dropdownId, setDropdownId] = useState("choice")
    const [queryObject, setQueryObject] = useState({}) 
    const [dropdownArray, setDropdownArray] = useState([])

    const [companyUpdateData, setCompanyUpdateData] = useState({
        id: "",
        name: "", 
        operator: "", 
        broker: "", 
        cod_sinister: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/companies');
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

        setCompanyUpdateData(prev => ({ ...prev, [name]: value }))
    }

    const updateValidator = async () => {
        try {
            const response = await fetch("http://localhost:3008/api/companies", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(companyUpdateData),
            });
      
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.status}`);
            }
      
            const data = await response.json();
            console.log("Resposta da API:", data);
        
            // Lógica adicional aqui se necessário

            setDropdownId("choice")

            setCompanyUpdateData({
                id: "",
                name: "", 
                operator: "", 
                broker: "", 
                cod_sinister: ""
            })

            reloadPage()
        } catch (error) {
            console.error("Erro durante a solicitação:", error);
        }
    }

    const handleDropdown = (event, data) => {
        const dropdownId = data.value

        setCompanyUpdateData({
            id: dropdownId,
            name: queryObject[dropdownId].name, 
            operator: queryObject[dropdownId].operator, 
            broker: queryObject[dropdownId].broker, 
            cod_sinister: queryObject[dropdownId].cod_sinister, 
        })

        setDropdownId(data.value)
    }

    const {
        name, 
        operator, 
        broker, 
        cod_sinister
    } = companyUpdateData

    return (
        <>
            <h4>UPDATE COMPANY</h4>
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
                                    <Button onClick={updateValidator} type='submit'>Update</Button>
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

export default CompaniesUpdate