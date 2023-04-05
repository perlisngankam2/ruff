import { Box, Flex, Center, Spinner } from '@chakra-ui/react';

import Loader from '../atoms/Loader';
import PulseLoader from "react-spinners/PulseLoader";

const BoxLoading = () => {
  return (

  //  <Center mt="20px">
  //       <Spinner
  //       thickness='4px'
  //         size={"xl"}
  //         color="green"
  //         emptyColor="gray.200"
  //         speed="0.65s"
  //         mt="200px"
  //       />
  //   </Center>

  <Box width={'100%'} height='100vh' display={'flex'} alignItems='center' justifyContent={'center'}>
 <PulseLoader
        color={'#36d7b7'}
        // loading={loading}
        // cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
        thickness='4px'
      />

  </Box>
  );
};

export default BoxLoading;
