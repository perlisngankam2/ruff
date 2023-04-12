import {Container} from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import Sidebar from '../components/layouts/sidebar-profile/Sidebar-profile';
import ContentProfile from '../components/layouts/Content-profil/Content-profile';
import Cover from '../components/layouts/Cover-profile';
import DefaultLayout from '../components/layouts/DefaultLayout';

export default function profil(){

        return(
            <DefaultLayout>
            <Container maxW='100%' mt={"30px"}>
                <Cover/>
                <Container display={{base: 'block', md: 'flex'}} maxW='container.xl'>
                <Sidebar/>
                <ContentProfile/>
                </Container>
            </Container>
            </DefaultLayout>
        )
    
}