import {Box, Tab, TabList, Tablist, TabPanel, TabPanels,Tabs,Button, useDisclosure, Icon} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import Link from "next/link";
import AccountSetting from './AccountSetting';
import Actions from './Actions';
import CompanySettings from './CompanySettings';
import Notifications from './Notifications';
import { FaUser } from "react-icons/fa";


const ContentProfile =() =>{

    const { isOpen, onOpen, onClose } = useDisclosure();

    const tabs = [' Mon Profil', 'Mot de passe']
    return(
        <Box
          flex={3}
          justifyContent="space-between"
          pt={0}
          bg="white"
          rounded={"md"}
          borderWidth={1}
          borderColor="gray.200"
          style={{transform: 'translateY(-100px)'}} 
         w='100%'
        >
            <Box w="full" display="flex" justifyContent="flex-end">
            <Button
            pt='-6'
            bg='red' 
            color='white'
            size={'sm'} 
            mr="0"
            mt="auto"
            _hover={{background:"red.300"}} 
             >
                <Link href='/dashboard'>
                  <CloseIcon ml="auto" />
                </Link>
            </Button>
            </Box>
            <Tabs>
                <TabList px={5}>
                    {tabs.map(tab =>(
                        <Tab
                        key={tab} 
                        mx={3}
                        px={0}
                        py={3}
                        fontWeight="semibold"
                        color="brand.cadet"
                        borderBottomWidth={1}
                        _active={{bg:'transparent'}}
                        _selected={{color: 'brand.dark', borderColor:'blue.100'}}
                        >
                            {/* <FaUser /> */}
                            {tab}

                        </Tab>
                    ))}
                </TabList>
                <TabPanels px={3} mt={5}>
                    <TabPanel>
                        <AccountSetting/>
                    </TabPanel>
                     <TabPanel>
                        <CompanySettings/>
                    </TabPanel>
                    
                </TabPanels>
            </Tabs>
            {/* <Actions/> */}

        </Box>

    )
}
export default ContentProfile