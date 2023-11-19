"use client"

import { useState, useEffect } from "react"
import { Table, Container } from "semantic-ui-react"

function AverageAccidentByCompany() {
    const [queryArray, setQueryArray] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/queries/averageAccidentByCompany');
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
            <h4>Average Sinister and Accident Rate by Company</h4>
            <Container style={{width: "90%"}}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Company Name</Table.HeaderCell>
                            <Table.HeaderCell>Sinister</Table.HeaderCell>
                            <Table.HeaderCell>Accident Rate</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                
                    <Table.Body>
                        {
                            queryArray.map(query => {
                                const { CompanyName, AccidentRate, Sinister} = query

                                return (
                                    <Table.Row>
                                        <Table.Cell>{CompanyName}</Table.Cell>
                                        <Table.Cell>${parseFloat(Sinister).toFixed(2)}</Table.Cell>
                                        <Table.Cell>{parseFloat(AccidentRate).toFixed(2)}%</Table.Cell>
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

export default AverageAccidentByCompany