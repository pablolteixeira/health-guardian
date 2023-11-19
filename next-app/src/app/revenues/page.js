"use client"

import { useState, useEffect } from 'react'
import { Table, Menu, Container } from 'semantic-ui-react'

import RevenuesNew from '@/components/Revenues/RevenuesNew'
import RevenuesUpdate from '@/components/Revenues/RevenuesUpdate'
import RevenuesDelete from '@/components/Revenues/RevenuesDelete'

function Revenues() {
    const [load, setLoad] = useState(0)
    const [queryArray, setQueryArray] = useState([])
    const [menuOption, setMenuOption] = useState("new")

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3008/api/revenues');
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
                        <RevenuesNew reloadPage={reloadPage} />
                    : menuOption === "update" ?
                        <RevenuesUpdate reloadPage={reloadPage} />
                    : <RevenuesDelete reloadPage={reloadPage} />
                }
            </Container>
            <br /><br />
            <Container style={{width: "90%"}}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Company ID</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                            <Table.HeaderCell>Data</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                
                    <Table.Body>
                        {
                            queryArray.map(query => {
                                const { id, company_id, value, data} = query

                                return (
                                    <Table.Row>
                                        <Table.Cell>{id}</Table.Cell>
                                        <Table.Cell>{company_id}</Table.Cell>
                                        <Table.Cell>${value}</Table.Cell>
                                        <Table.Cell>{data.slice(0, 10)}</Table.Cell>
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

export default Revenues