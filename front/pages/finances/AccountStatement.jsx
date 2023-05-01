import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton ,
  Center,
  Flex,
  Heading,
  Hide,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Avatar,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  InputRightElement,
  AlertDialogCloseButton
} from "@chakra-ui/react";
import ReactToPrint from 'react-to-print';
import ReactToPdf from "react-to-pdf";
// import Link from "../../components/atoms/Link"
import React from "react";
import Link from "next/link";
import Routes from "../../modules/routes";
import { useState, useRef, useEffect } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { IoIosAdd } from "react-icons/io";
import{ FiEdit, FiSearch, FiSidebar} from 'react-icons/fi';
import {TfiFilter, TfiPrinter} from "react-icons/tfi"
import {RiDeleteBin5Line} from "react-icons/ri"
import {BiTrendingDown, BiTrendingUp} from "react-icons/bi"
import {MdDelete, MdOutlineHorizontalRule} from 'react-icons/md';
import {HiOutlineMinus} from "react-icons/hi"
import {useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GlobalContext } from "../../contexts/cyclesection/AppContext";
import { getStaticPropsTranslations } from "../../types/staticProps";

import {  
  GET_ALL_STUDENT, 
  GET_STUDENT_BY_ID,
  GET_ALL_CLASS,
  GET_ALL_EXPENSE_PERSONNEL_STUDENT
} from "../../graphql/Queries";
import { DELETE_STUDENT } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import ReactPaginate from "react-paginate";
import { CSVLink, CSVDownload } from "react-csv";

const AccountStatement = () => {

    const {t} = useTranslation();
    const {data:dataExpensePersonnelStudent} = useQuery(GET_ALL_EXPENSE_PERSONNEL_STUDENT)
    const date1 = new Date('December 17, 1995 03:24:00')


    const componentRef = useRef();
    const ref = React.createRef();
    const options = {
        orientation: 'landscape',
        // unit: 'mm',
        // format: 'a4',
    };

    useEffect(() => {
        console.log(dataExpensePersonnelStudent?.findallexpenses)
    })

    return(
            <DefaultLayout>
              <Box p="3" pt={"70px"} w="full">
                <Flex
                  align="center"
                  justify="space-between"
                  boxShadow="md"
                  p="5"
                  rounded="lg"
                  background="white"
                >
                  <Heading
                    textAlign="center"
                    color="WindowText"
                    size="lg"
                    textColor="pink.300"
                  >
                    {t('pages.finances.accountStatement.heading')}
                  </Heading>
                  <Hide below="sm">
                    <Text>Dashboad /</Text>
                  </Hide>
                </Flex>
                    <Flex 
                        // ml={["500px","600px","900px"]}
                        mt={"40px"}
                        gap={20}
                    > 
                        <Box 
                            display={{md:"flex"}}
                            gap={2}
                        >
                            <Input type="date"/> 
                            <Text 
                                mt="9px" 
                                fontWeight={"bold"}
                                color={"colors.greenColor400"}
                            >
                                To:
                            </Text>
                            <Input type="date"/>
                        </Box>
                        <Flex
                            align={"center"}
                            // flexWrap={["wrap", "wrap", "wrap"]}
                            gap={12}
                            bg={"blackAlpha.100"}
                            width={"220px"}
                            borderRadius={"lg"}
                            ml={"420px"}
                        > 
                        <ReactToPrint
               trigger={() => <Icon as={TfiPrinter} boxSize="42px" alignItems={"center"} p="3" />}
               content={() => componentRef.current}
                documentTitle= "Etat des entrees et sorties"
                pageStyle="print"
              />
                        {/* <Icon
                            alignItems={"center"}
                            as={TfiPrinter}
                            boxSize="42px"
                            p="3"
                            // bg="blue.100"
                            // rounded="full"
                        /> */}
                        <Icon
                            as={RiDeleteBin5Line}
                            boxSize="42px"
                            p="3"
                            rounded="full"
                            // color="colors.quaternary"
                            // _hover={{background:"blue.100"}}
                            // onClick={onToggle}
                        />
                        <Icon
                            as={TfiFilter}
                            boxSize="42px"
                            p="3"
                            rounded="full"
                            // color="colors.quaternary"
                                // _hover={{background:"blue.100"}}
                                // onClick={onToggle}
                            />
                            
                        </Flex>
                    </Flex> 
                    <Flex 
                        gap={50}
                        mt="35px"
                    >
                        <Box 
                            display={{md:"flex"}}
                            gap={3}
                        > 
                            <Button 
                                fontSize={"sm"}
                                bg={"blackAlpha.100"}
                                width={"50px"}
                                border="1px"
                            >
                                {/* <CSVLink data={} filename={"my-file.csv"} > EXPORT</CSVLink> */}
                            </Button>
                            
                            <ReactToPdf targetRef={componentRef} filename="Etat des entrees et sorties" options={options} y={10} >
                                {({toPdf}) => ( <Button bg={"blackAlpha.100"} onClick={toPdf} border="1px" width={"50px"} fontSize={"sm"}>PDF</Button>)}
                            </ReactToPdf>

                        
                        </Box>
                        <Box width={"300px"} ml="700px">
                            <InputGroup >
                                <InputRightElement
                                    children={<Icon as={FiSearch} />}
                                    cursor="pointer"
                                />
                                <Input
                                    placeholder="Recherchez un niveau..."
                                    //value={recherche}
                                    // onChange={e => setQuery(e.target.value)}
                                    // onChange={handleChange}
                                    variant="flushed"
                                />
                            </InputGroup>
                        </Box>
                    </Flex>
                        <Box 
                            mt={10} 
                            // p="5px" 
                            border={"1px"}
                             rounded={"md"}
                            ref={componentRef}
                        >
                                <Flex
                                    gap={"110px"}
                                    p="5px"
                                    // width={"full"}
                                    fontWeight={"bold"}
                                    borderBottom={"1px"}
                                    background="colors.secondary"
                                > 
                                    <Box width='120px' 
                                        flex={1}
                                        // borderLeft={"1px"}
                                    >
                                        Date
                                    </Box>
                                    <Box 
                                        width='290px'
                                        ml="15px"
                                    >
                                        description
                                        {/* {t('pages.finances.accountStatement.description')} */}
                                    </Box>
                                    <Box 
                                        width='150px'
                                    >
                                        Debit
                                    </Box>
                                    <Box 
                                        width='180px'
                                    >
                                        Credit
                                    </Box>
                                    <Box 
                                        width='265px'
                                    >
                                        Net
                                    </Box>
                                </Flex>
                                <>
                                <Box>  
                                     {dataExpensePersonnelStudent && 
                                        (dataExpensePersonnelStudent?.findallexpenses.map((expense, index) => ( 
                                    <Flex
                                        gap={"80px"}
                                        p="5px"
                                        width={"full"}
                                        // fontWeight={"bold"}
                                        // mt="5px"
                                        borderBottom={"1px"}
                                        key={index}
                                    > 
                                    
                                        <Box 
                                            // width='95px' 
                                            // flex={1}
                                        >
                                            <Box>
                                                {/* {((new Date(expense.createdOn)).toDateString())}  */}
                                                {((new Date(expense.createdOn)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' }))} 
                                                {console.log((date1).toDateString())}

                                            </Box>
                                        </Box>
                                        <Box 
                                            width='260px'
                                        >
                                           {expense.studentFirstname}
                                           {expense.studentLastname}
                                           {expense.personnelFirstName}
                                           {expense.personnelLastName}
                                           {expense.personnelFonction}
                                        </Box>
                                        <Box 
                                            width='150px'
                                            display={{md:"flex"}}
                                        >
                                            <Flex 
                                                flexDirection={"column"}
                                                gap={1}
                                            >
                                                <Icon
                                                    as={BiTrendingDown}
                                                    boxSize="20px"
                                                    rounded="full"
                                                    color="colors.redColor400"
                                                    mb={"-17px"}
                                                />
                                                <Icon
                                                    as={HiOutlineMinus}
                                                    boxSize="25px"
                                                    ml={"-2px"}
                                                    // p="3"
                                                    rounded="full"
                                                    color="colors.redColor400"
                                                />
                                            </Flex>
                                            <Box> {expense.debitamount}</Box>
                                        </Box>
                                        <Box width='180px'
                                            display={{md:"flex"}}
                                        >
                                            <Flex 
                                                flexDirection={"column"}
                                                gap={0}
                                            >
                                                <Icon
                                                    as={BiTrendingUp}
                                                    boxSize="20px"
                                                    // p="3"
                                                    rounded="full"
                                                    color="colors.greenColor400"
                                                    mb={"-15px"}
                                                />
                                                <Icon
                                                    as={HiOutlineMinus}
                                                    boxSize="25px"
                                                    ml={"-2px"}
                                                    // p="3"
                                                    rounded="full"
                                                    color="colors.greenColor400"
                                                
                                                />
                                            </Flex>
                                            <Box>{expense.creditamount}</Box>
                                        </Box>
                                        <Box width='200px'>
                                            Net
                                        </Box> 
                                    </Flex>
                                     )) 
                                     )} 
                                </Box>
                                </>
                                <Flex
                                    gap={100}
                                    p="5px"
                                    width={"full"}
                                    // fontWeight={"bold"}
                                    // mt="12px"
                                > 
                                    <Box
                                        flex={1}
                                        fontWeight={"bold"}
                                        ml="150px"

                                    >
                                        Total
                                    </Box>
                                    <Box
                                     width='160px'
                                    >
                                        350000
                                    </Box>
                                    <Box width='150px'>
                                        500
                                    </Box>
                                    <Box width='180px'>
                                        40000
                                    </Box>
                                </Flex>
                            </Box >
                  
                <Box mt={"15px"}> 
                  <ReactPaginate 
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    // pageCount={pageCountStudent}
                    // onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
              </Box>
              </Box>
            </DefaultLayout>
    )
}

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await getStaticPropsTranslations(locale)),
        // Will be passed to the page component as props
      },
    };
  }


export default AccountStatement;



