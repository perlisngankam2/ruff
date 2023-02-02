import { ListItem, HStack , Link , Text , Box} from "@chakra-ui/react";

const Test = ({ postsPerPage, totalPosts , paginate}) => {
    
    const pageNumbers = [];
    
    for (let i=1; i<= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }
    
    return <>
        <HStack>
            {
                pageNumbers.map((number) =>(
                    <Link 
                        key={number}
                        _hover={{bg:'blue.100'}}
                        onClick={() =>paginate(number)}
                    >
                        <Box
                            color={'blue.500'}
                            borderWidth='2px'
                            borderColor={'blue.500'}
                            p='1'
                        >
                            <Text>
                                {number}
                            </Text>
                        </Box>
                        
                    </Link>
                ))
            }
        </HStack>
    </>
}


export default Test ;