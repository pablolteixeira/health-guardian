"use client"

import { useState, useEffect } from 'react'
import { Table, Menu, Container } from 'semantic-ui-react'

//import AppointmentsNew from '@/components/Appointments/AppointmentsNew'
//import AppointmentsUpdate from '@/components/Appointments/AppointmentsUpdate'
//import AppointmentsDelete from '@/components/Appointments/AppointmentsDelete'

function Appointments() {
    const [load, setLoad] = useState(0)
    const [queryArray, setQueryArray] = useState([])
    const [menuOption, setMenuOption] = useState("new")

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/appointments');
              const result = await response.json();
              setQueryArray(result)
            } catch (e) {
              console.error('Error fetching data:', error);
            }
          }
      
          fetchData()
    }, [load])

    const handleMenu = (_, {name}) => {

        setMenuOption(name)
    }

    const reloadPage = () => {
        setLoad(load + 1)
    }

    return (
        <>  
            <Container style={{width: "60%"}} textAlign="center">
                <Menu widths={3} secondary>
                    <Menu.Item
                        name='new'
                        active={menuOption === 'new'}
                        onClick={(handleMenu)}
                    >
                        New
                    </Menu.Item>

                    <Menu.Item
                        name='update'
                        active={menuOption === 'update'}
                        onClick={handleMenu}
                    >
                        Update
                    </Menu.Item>

                    <Menu.Item
                        name='delete'
                        active={menuOption === 'delete'}
                        onClick={handleMenu}
                    >
                        Delete
                    </Menu.Item>
                </Menu>
            </Container>
            <br /><br />
            <Container style={{width: "70%"}} textAlign='center'>
                {/*
                    menuOption === "new" ?
                        <AppointmentsNew reloadPage={reloadPage} />
                    : menuOption === "update" ?
                        <AppointmentsUpdate reloadPage={reloadPage} />
                    : <AppointmentsDelete reloadPage={reloadPage} />
                */}
            </Container>
            <br /><br />
            <Container style={{width: "90%"}}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                            <Table.HeaderCell>Competence</Table.HeaderCell>
                            <Table.HeaderCell>Company ID</Table.HeaderCell>
                            <Table.HeaderCell>Name Benef</Table.HeaderCell>
                            <Table.HeaderCell>CPF</Table.HeaderCell>
                            <Table.HeaderCell>Cod Procedure</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                
                    <Table.Body>
                        {
                            queryArray.map(query => {
                                const { id, value, competence, company_id, name_benef, cpf, cod_procedure} = query

                                return (
                                    <Table.Row>
                                        <Table.Cell>{id}</Table.Cell>
                                        <Table.Cell>{value}</Table.Cell>
                                        <Table.Cell>{competence}</Table.Cell>
                                        <Table.Cell>{company_id}</Table.Cell>
                                        <Table.Cell>{name_benef}</Table.Cell>
                                        <Table.Cell>{cpf}</Table.Cell>
                                        <Table.Cell>{cod_procedure}</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </Container>
            <br />
            <br />
        </>
    )
}

export default Appointments