import { Box, HStack ,Heading , Input, Stack , Center , Flex} from "@chakra-ui/react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useState } from 'react';
import PaiementTable from "./paiementTable";
import { Users } from "../api/data/users";



const AjouterPersonnel = () => {

    const [query , setQuery] = useState("");
    const [data, setData] = useState([]);
    const keys = ["first_name", "last_name", "email"];

    const search = (data) => {
       
        let datas = data.filter((item) =>
          keys.some((key) => item[key].toLowerCase().includes(query))
        );
        console.log("datas :" , datas)
        return query ? datas.slice(0,5) : Users.slice(0,5)
      };



  return (
    <DefaultLayout>
      <Box p={3} pt="70px">
        <Flex ml={20} p='10' w={'50vw'}>
            <Stack w={'100%'}>
                <Input 
                    type={'text'}
                    variant='flushed' 
                    placeholder="Entrer le nom de l'élève"
                    onChange={(e) =>setQuery(e.target.value)}
                />
            </Stack>
        </Flex>
        
             <PaiementTable data={search(Users)} />
        
      </Box>
    </DefaultLayout>
  );
};

export default AjouterPersonnel;
