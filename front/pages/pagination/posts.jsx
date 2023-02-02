    import {
        Table,
        Thead,
        Tbody,
        Tfoot,
        Tr,
        Th,
        Td,
        TableCaption,
        TableContainer,
        Box,
        Text ,
        Stack ,
      } from '@chakra-ui/react'



const Posts = ({ posts , loading}) => {
    if (loading) {
        return <Text>Loading . . .</Text>
    }


    return (
       
        <TableContainer>
  <Table variant='striped'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        posts.map((post) => (
            <Tr key={post.id}>
                <Td>{post.first_name}</Td>
                <Td>{post.last_name}</Td>
                <Td>{post.email}</Td>
            </Tr>
        ))
      }
    </Tbody>
  </Table>
</TableContainer>
    )
}


export default Posts ; 