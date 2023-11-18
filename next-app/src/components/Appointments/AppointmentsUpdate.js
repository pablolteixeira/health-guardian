"use client"

import { useState, useEffect } from "react"

import { Button, Form, Segment, Dropdown } from "semantic-ui-react"

import convertArrayToObject from "@/utils/convertArrayToObject";

function AppointmentsUpdate({ reloadPage }) {
    const [dropdownId, setDropdownId] = useState("choice")
    const [queryObject, setQueryObject] = useState({}) 
    const [dropdownArray, setDropdownArray] = useState([])

    const [appointmentsUpdateData, setAppointmentsUpdateData] = useState({
        value: "", 
        competence: "", 
        company_id: "", 
        collaborator_id: "", 
        cod_procedure: "", 
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/appointments');
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

        setAppointmentsUpdateData(prev => ({ ...prev, [name]: value }))
    }

    const updateAppointments = async () => {
        try {
            const response = await fetch("http://localhost:3008/api/appointments", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(appointmentsUpdateData),
            });
      
            if (!response.ok) {
              throw new Error(`Erro na solicitação: ${response.status}`);
            }
      
            const data = await response.json();
            console.log("Resposta da API:", data);
        
            // Lógica adicional aqui se necessário

            setDropdownId("choice")

            setAppointmentsUpdateData({
                value: "", 
                competence: "", 
                company_id: "", 
                collaborator_id: "", 
                cod_procedure: "", 
            })

            reloadPage()
        } catch (error) {
            console.error("Erro durante a solicitação:", error);
        }
    }

    const handleDropdown = (event, data) => {
        const dropdownId = data.value

        setAppointmentsUpdateData({
            id: dropdownId,
            value: queryObject[dropdownId].value, 
            competence: queryObject[dropdownId].competence.slice(0, 10),
            company_id: queryObject[dropdownId].company_id,
            collaborator_id: queryObject[dropdownId].collaborator_id, 
            cod_procedure: queryObject[dropdownId].cod_procedure, 
        })

        setDropdownId(data.value)
    }

    const {
        value, 
        competence, 
        company_id, 
        collaborator_id, 
        cod_procedure
    } = appointmentsUpdateData

    return (
        <>
            <h4>UPDATE APPOINTMENT</h4>
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
                                        <label>Value:</label>
                                        <input onChange={handleInput} name="value" value={value} placeholder='' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Competence:</label>
                                        <input onChange={handleInput} name="competence" value={competence} placeholder='' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Company ID:</label>
                                        <input onChange={handleInput} name="company_id" value={company_id} placeholder='' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Collaborator ID:</label>
                                        <input onChange={handleInput} name="collaborator_id" value={collaborator_id} placeholder='' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Procedure Code:</label>
                                        <input onChange={handleInput} name="cod_procedure" value={cod_procedure} placeholder='' />
                                    </Form.Field>
                                    <Button onClick={updateAppointments} type='submit'>Update</Button>
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

export default AppointmentsUpdate