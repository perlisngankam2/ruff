import {
    Box, 
    Tab,
     TabList, 
     Tablist, 
     TabPanel, 
     TabPanels,
     Tabs,
     Button, 
     AlertDialog,
     AlertDialogBody,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogContent,
     AlertDialogOverlay,
     AlertDialogCloseButton,
    useDisclosure, 
    Icon
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import Link from "next/link";
import AccountSetting from './AccountSetting';
import Actions from './Actions';
import CompanySettings from './CompanySettings';
import Notifications from './Notifications';
import { FaUser } from "react-icons/fa";
import React, {useEffect, useState, useMemo, useContext, use} from "react";
import Cover from '../Cover-profile';
import Sidebar from '../sidebar-profile/sidebar-profile';

const ContentProfilePopop = ({isOpen, onOpen, onClose}) =>{

    // const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const tabs = [' Mon Profil', 'Mot de passe']

    return(
        <Box
          flex={3}
        //   justifyContent="space-between"
          pt={0}
          bg="white"
          rounded={"md"}
        //   borderWidth={1}
        //   borderColor="gray.200"
          style={{transform: 'translateY(-100px)'}} 
        //  w='100%'
        >
            {/* <Box w="full" display="flex" justifyContent="flex-end">
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
            </Box> */}
            {/* <Actions/> */}
            {/* <Box > 
                <Button  onClick={onOpen} bg={"white"}>
                    Parametressss
                </Button>
            </Box> */}
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogContent 
                        maxWidth={"62%"}
                        ml={"150px"}
                        // mt={"-5px"}
                    >
                        <Cover/>
                        <AlertDialogBody 
                            display={{md: 'flex'}} 
                            maxW='container.xl'
                        >
                            <Box> 
                                <Sidebar/>
                            </Box> 
                            <Box rounded={"full"}> 
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
                            </Box>
                           
                        </AlertDialogBody>
                        {/* <AlertDialogCloseButton /> */}
                        <AlertDialogFooter mt={"-65px"}>
                        <Button ref={cancelRef} colorScheme='red' onClick={onClose}>
                            Fermer
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </Box>
    )
}
export default ContentProfilePopop