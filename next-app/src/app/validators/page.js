"use client"

import { useState, useEffect } from 'react'
import { Table, Menu, Container } from 'semantic-ui-react'

import ValidatorsNew from '@/components/Validators/ValidatorsNew'
import ValidatorsUpdate from '@/components/Validators/ValidatorsUpdate'
import ValidadorsDelete from '@/components/Validators/ValidatorsDelete'

function Validators() {
    const [load, setLoad] = useState(0)
    const [queryArray, setQueryArray] = useState([])
    const [menuOption, setMenuOption] = useState("new")

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/validators');
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
                {
                    menuOption === "new" ?
                        <ValidatorsNew reloadPage={reloadPage} />
                    : menuOption === "update" ?
                        <ValidatorsUpdate reloadPage={reloadPage} />
                    : <ValidadorsDelete reloadPage={reloadPage} />
                }
            </Container>
            <br /><br />
            <Container style={{width: "90%"}}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Company ID</Table.HeaderCell>
                            <Table.HeaderCell>Competence</Table.HeaderCell>
                            <Table.HeaderCell>Lives</Table.HeaderCell>
                            <Table.HeaderCell>Revenue</Table.HeaderCell>
                            <Table.HeaderCell>Sinister</Table.HeaderCell>
                            <Table.HeaderCell>Accident Rate</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                
                    <Table.Body>
                        {
                            queryArray.map(query => {
                                const { id, company_id, competence, lives, revenue, sinister, accident_rate} = query

                                return (
                                    <Table.Row>
                                        <Table.Cell>{id}</Table.Cell>
                                        <Table.Cell>{company_id}</Table.Cell>
                                        <Table.Cell>{competence}</Table.Cell>
                                        <Table.Cell>{lives}</Table.Cell>
                                        <Table.Cell>{revenue}</Table.Cell>
                                        <Table.Cell>{sinister}</Table.Cell>
                                        <Table.Cell>{accident_rate}</Table.Cell>
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

export default Validators