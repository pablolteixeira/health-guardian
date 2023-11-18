"use client"

import { useState, useEffect } from "react"

import { Button, Form, Segment, Dropdown } from "semantic-ui-react"

import convertArrayToObject from "@/utils/convertArrayToObject";

function AppointmentsUpdate({ reloadPage }) {
    const [dropdownId, setDropdownId] = useState("choice")
    const [queryObject, setQueryObject] = useState({}) 
    const [dropdownArray, setDropdownArray] = useState([])

    const [appointmentsUpdateData, setAppointmentsUpdateData] = useState({
        id: "",
        value: "", 
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
                id: "",
                value: "", 
                collaborator_id: "", 
                cpf: "", 
            })
            id: "",
        value: "", 
        collaborator_id: "", 
        cod_procedure: "", 

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
            collaborator_id: queryObject[dropdownId].collaborator_id, 
            cpf: queryObject[dropdownId].cpf, 
        })

        setDropdownId(data.value)
    }

    const {
        value, 
        collaborator_id, 
        cpf
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
                                        <label>value:</label>
                                        <input onChange={handleInput} name="value" value={value} placeholder='' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Company ID:</label>
                                        <input onChange={handleInput} name="collaborator_id" value={collaborator_id} placeholder='' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>CPF:</label>
                                        <input onChange={handleInput} name="cpf" value={cpf} placeholder='' />
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