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
// import Link from "../../components/atoms/Link"
import React from "react";
import Link from "next/link";
import Routes from "../../modules/routes";
import { useState, useEffect } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { IoIosAdd } from "react-icons/io";
import{ FiEdit, FiSearch, FiSidebar} from 'react-icons/fi';
import {TfiFilter, TfiPrinter} from "react-icons/tfi"
import {RiDeleteBin5Line} from "react-icons/ri"
import {BiTrendingDown, BiTrendingUp} from "react-icons/bi"
import {MdDelete, MdOutlineHorizontalRule} from 'react-icons/md';
import {HiOutlineMinus} from "react-icons/hi"
import {useRouter } from "next/router";
import {  
  GET_ALL_STUDENT, 
  GET_STUDENT_BY_ID,
  GET_ALL_CLASS
} from "../../graphql/Queries";
import { DELETE_STUDENT } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import ReactPaginate from "react-paginate";

const AccountStatement = () => {
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
                   Etat des entrees et sorties 
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
                        <Icon
                            alignItems={"center"}
                            as={TfiPrinter}
                            boxSize="42px"
                            p="3"
                            // bg="blue.100"
                            // rounded="full"
                        />
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
                                Excel
                            </Button>
                            <Button  
                                bg={"blackAlpha.100"}
                                fontSize={"sm"}
                                width={"50px"}
                                border="1px"
                            >
                                PDF
                            </Button> 
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

                        >
                                <Flex
                                    gap={100}
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
                                    >
                                        Description
                                    </Box>
                                    <Box 
                                        width='160px'
                                    >
                                        Debit
                                    </Box>
                                    <Box 
                                        width='150px'
                                    >
                                        Credit
                                    </Box>
                                    <Box 
                                        width='180px'
                                    >
                                        Net
                                    </Box>
                                </Flex>
                                <Flex
                                    gap={100}
                                    p="5px"
                                    width={"full"}
                                    // fontWeight={"bold"}
                                    // mt="5px"
                                    borderBottom={"1px"}
                                > 
                                    <Box width='100px' 
                                        flex={1}
                                    >
                                        <Box>Date</Box>
                                    </Box>
                                    <Box width='290px'

                                    >
                                        Description
                                    </Box>
                                    <Box 
                                        width='160px'
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
                                        <Box> Debit</Box>
                                    </Box>
                                    <Box width='150px'
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
                                        <Box>Credit</Box>
                                    </Box>
                                    <Box width='180px'>
                                        Net
                                    </Box>
                                </Flex>
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

export default AccountStatement;



