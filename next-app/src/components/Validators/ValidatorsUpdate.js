"use client"

import { useState, useEffect } from "react"

import { Button, Form, Segment, Dropdown } from "semantic-ui-react"

import convertArrayToObject from "@/utils/convertArrayToObject";

function ValidatorsUpdate({ reloadPage }) {
    const [dropdownId, setDropdownId] = useState("choice")
    const [queryObject, setQueryObject] = useState({}) 
    const [dropdownArray, setDropdownArray] = useState([])

    const [validatorUpdateData, setValidatorUpdateData] = useState({
        id: "",
        company_id: "", 
        competence: "", 
        lives: "", 
        revenue: "", 
        sinister: "", 
        accident_rate: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/validators');
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

        setValidatorUpdateData(prev => ({ ...prev, [name]: value }))
    }

    const updateValidator = async () => {
        try {
            const response = await fetch("http://localhost:3008/api/validators", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(validatorUpdateData),
            });
      
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.status}`);
            }
      
            const data = await response.json();
            console.log("Resposta da API:", data);
        
            // Lógica adicional aqui se necessário

            setDropdownId("choice")

            setValidatorUpdateData({
                id: "",
                company_id: "", 
                competence: "", 
                lives: "", 
                revenue: "", 
                sinister: "", 
                accident_rate: ""
            })

            reloadPage()
        } catch (error) {
            console.error("Erro durante a solicitação:", error);
        }
    }

    const handleDropdown = (event, data) => {
        const dropdownId = data.value

        setValidatorUpdateData({
            id: dropdownId,
            company_id: queryObject[dropdownId].company_id, 
            competence: queryObject[dropdownId].competence.slice(0, 10), 
            lives: queryObject[dropdownId].lives, 
            revenue: queryObject[dropdownId].revenue, 
            sinister: queryObject[dropdownId].sinister, 
            accident_rate: queryObject[dropdownId].accident_rate
        })

        setDropdownId(data.value)
    }

    const {
        company_id, 
        competence, 
        lives, 
        revenue, 
        sinister, 
        accident_rate
    } = validatorUpdateData

    return (
        <>
            <h4>UPDATE VALIDATOR</h4>
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

export default ValidatorsUpdate