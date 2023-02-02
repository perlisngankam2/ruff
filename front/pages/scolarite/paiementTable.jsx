import { AddIcon } from '@chakra-ui/icons';
import { Box ,
    Table ,
    Td ,
    Th ,
    Tr , 
    Tbody , 
    TableCaption , 
    Tfoot ,
    TableContainer ,
    Thead , 
    Avatar ,
    Link , 
    IconButton ,
    Button ,
    ButtonGroup , 
    Icon, 
} from '@chakra-ui/react';
import {FiEdit} from 'react-icons/fi'
//import { Users } from '../api/data/users';

const PaiementTable = ({data}) => {

    console.log(data)

    return <>
    <TableContainer>
        <Table variant='striped'>
            {/* <TableCaption>Liste des eleves</TableCaption> */}
            <Thead>
            <Tr>
                <Th>Nom</Th>
                <Th>Prenom</Th>
                <Th >classe</Th>
                <Th>sexe</Th>
                <Th>Photo</Th>
                <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            {data.map((item, index) =>(
                // <Link href='/scolarite/formulaire' key={index}>
                    <Tr key={index}>
                    <Td borderColor={'#C6B062'}>{item.last_name}</Td>
                    <Td borderColor={'#C6B062'}>{item.first_name}</Td>
                    <Td borderColor={'#C6B062'}>{item.classe}</Td>
                    <Td borderColor={'#C6B062'}>{item.gender}</Td>
                    <Td borderColor={'#C6B062'}>
                        <Avatar 
                            size='xs' 
                            name='Dan Abrahmov' 
                            src='https://bit.ly/dan-abramov'
                        /> 
                    </Td>
                    <Td borderColor={'#C6B062'}>
                     <ButtonGroup 
                        size='sm' 
                        isAttached 
                        variant='link' 
                        colorScheme={'teal'}
                        >
                         <Button>
                            <Link 
                             href='/eleves/details'
                            >Details</Link>
                         </Button>
                         <Link
                          href='/eleves/scolariteform'
                         >
                           <IconButton aria-label='Add to friends' _hover={{color:'#E2D39C'}}  icon={<AddIcon />} />                      
                         </Link>
                         
                    </ButtonGroup> 
                    </Td>
                    <Box ml='-100px' mt='8px'>
                        <Link 
                        href="/eleves/modifiereleve">
                            <Icon
                            as={FiEdit}
                            boxSize="40px"
                            p="3"
                            // bg="blue.100"
                            // rounded="full"
                            />
                        </Link>
                    </Box> 
                </Tr>
            // </Link>
                )
             )}
            </Tbody>
            {/* <Tfoot>
            <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
            </Tr>
            </Tfoot> */}
        </Table>
    </TableContainer>
    </>
}




export default PaiementTable ; 