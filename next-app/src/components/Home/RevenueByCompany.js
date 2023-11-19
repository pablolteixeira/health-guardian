"use client"

import { useState, useEffect } from "react"
import { Table, Container } from "semantic-ui-react"

function RevenueByCompany() {
    const [queryArray, setQueryArray] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/queries/revenueByCompany');
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
            <h4>Revenue Value by Company</h4>
            <Container style={{width: "90%"}}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Company Name</Table.HeaderCell>
                            <Table.HeaderCell>Revenue Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                
                    <Table.Body>
                        {
                            queryArray.map(query => {
                                const { CompanyName, ValueRevenue} = query

                                return (
                                    <Table.Row>
                                        <Table.Cell>{CompanyName}</Table.Cell>
                                        <Table.Cell>${parseFloat(ValueRevenue).toFixed(2)}</Table.Cell>
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

export default RevenueByCompany