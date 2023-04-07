import {Box, Tab, TabList, Tablist, TabPanel, TabPanels,Tabs} from '@chakra-ui/react';


import AccountSetting from './AccountSetting';
import Actions from './Actions';
import CompanySettings from './CompanySettings';
import Notifications from './Notifications';

const ContentProfile =() =>{
    const tabs = ['Compte', 'Compagnie', 'Notification']
    return(
        <Box
          as='main'
          flex={3}
          d="flex"
          flexDir={"column"}
          justifyContent="space-between"
          pt={5}
          bg="white"
          rounded={"md"}
          borderWidth={1}
          borderColor="gray.200"
          style={{transform: 'translateY(-100px)'}}
        
        >
            <Tabs>
                <TabList px={5} gap={20}>
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
                        _selected={{color: 'brand.dark', borderColor:'blue'}}
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
            <Actions/>

        </Box>

    )
}
export default ContentProfile