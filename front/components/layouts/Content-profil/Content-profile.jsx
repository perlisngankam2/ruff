import {Box, Tab, TabList, Tablist, TabPanel, TabPanels,Tabs,Button, useDisclosure} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import Link from "next/link";
import AccountSetting from './AccountSetting';
import Actions from './Actions';
import CompanySettings from './CompanySettings';
import Notifications from './Notifications';


const ContentProfile =() =>{

    const { isOpen, onOpen, onClose } = useDisclosure();

    const tabs = ['Paramètre Compte', 'Paramètre Compagnie', 'Notification']
    return(
        <Box
          as='main'
          flex={3}
          d="flex"
          flexDir={"column"}
          justifyContent="space-between"
          pt={0}
          bg="white"
          rounded={"md"}
          borderWidth={1}
          borderColor="gray.200"
          style={{transform: 'translateY(-100px)'}} 
         w='100%'
        >
            <Button pt='-6' bg='red' color='white' size={'sm'}  ml={755} _hover={{background:"red.300"}}
             >
                <Link href='/dashboard'>
                  <CloseIcon />
                </Link>
            </Button>
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
                        _selected={{color: 'brand.dark', borderColor:'brand.blue'}}
                        >
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
                    <TabPanel>
                        <Notifications/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {/* <Actions/> */}
        </Box>

    )
}
export default ContentProfile