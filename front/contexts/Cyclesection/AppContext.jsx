import  React, {createContext, useState , useEffect} from 'react';
import SearchBar from "../../components/atoms/searchbar";
import {
  useDisclosure,
} from '@chakra-ui/react';

export const GlobalContext = createContext({
    // addTask: () => {},
    // updateTask: () => {},
    // deleteTask: () => {},
    // getTask: () => {},
    // getTasks: () => {}
});

const AppContext = ({children}) => {

    // const [taskList , setTaskList] = useState([]);
    const [name , setName] = useState("");
    const [cycle, setCycle] = useState("")
    const [section, setSection] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <GlobalContext.Provider value={{
            name: name,
            cycle:cycle,
            section: section,
            setName: setName,
            setSection: setSection,
            setCycle: setCycle,
            isOpen : isOpen,
            onOpen: onOpen,
            onClose: onClose
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export default AppContext;

