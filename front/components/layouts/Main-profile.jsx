import { Container } from "@chakra-ui/layout";
import ContentProfile from "./Content-profil/Content-profile";
import Sidebar from "./sidebar-profile/Sidebar-profile";

export default function Main(){
    return(
        <Container display={{base: 'block', md: 'flex'}} maxW='container.xl'>
            <Sidebar/>
            <ContentProfile/>
        </Container>
    )
}