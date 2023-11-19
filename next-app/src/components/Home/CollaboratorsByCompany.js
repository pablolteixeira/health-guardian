"use client"

import { useState, useEffect } from "react"
import { Table, Container } from "semantic-ui-react"

function CollaboratorsByCompany() {
    const [queryArray, setQueryArray] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/queries/collaboratorsByCompany');
              const result = await response.json();
              setQueryArray(result)
            } catch (e) {
              console.error('Error fetching data:', error);
            }
          }
      
          fetchData()
    }, [])

    return (
        <>
            <h4>Appointments Value Sum by Collaborator</h4>
            <Container style={{width: "90%"}}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Collaborator Name</Table.HeaderCell>
                        <Table.HeaderCell>Collaborators CPF</Table.HeaderCell>
                        <Table.HeaderCell>Company Name</Table.HeaderCell>
                        <Table.HeaderCell>Value Appointments</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                
                    <Table.Body>
                        {
                            queryArray.map(query => {
                                const { CollaboratorsName, CollaboratorsCPF, CompanyName, ValueAppointments} = query

                                return (
                                    <Table.Row>
                                        <Table.Cell>{CollaboratorsName}</Table.Cell>
                                        <Table.Cell>{CollaboratorsCPF}</Table.Cell>
                                        <Table.Cell>{CompanyName}</Table.Cell>
                                        <Table.Cell>${parseFloat(ValueAppointments).toFixed(2)}</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </Container>
        </>
    )
}

export default CollaboratorsByCompany