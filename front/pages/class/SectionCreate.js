import { AlertDialogCloseButton, Box, Heading } from "@chakra-ui/react";
import SearchBar from "../../components/atoms/searchbar";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Center,
  Flex,
  Input,
  FormControl,
  FormLabel,
  extendTheme,
  Icon,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { useMutation } from "@apollo/client";
import { CREATE_SECTION, UPDATA_SECTION } from "../../graphql/Mutation";
import { GET_ALL_SECTION } from "../../graphql/Queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getStaticPropsTranslations } from "../../types/staticProps";
import { useTranslation } from "next-i18next";
import { useAuth } from "../../contexts/account/Auth/Auth";

const SectionCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { setAuthToken, authToken } = useAuth();
  const [createSection, { error }] = useMutation(CREATE_SECTION);
  const [updateSection] = useMutation(UPDATA_SECTION);
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  // const addCategoryPersonnel = async (event, value) => {
  //     console.log("value")
  //     event.preventDefault();

  //     console.log(event.target.name.value);
  //     console.log(event.target.description.value);

  //     // const categoryData = await createCategoryPersonnel({
  //             // variables: {
  //         //     createcategoriepersonnnel: {
  //         //
  //         //             nom : event.target.value,
  //         //             description: event.target.value
  //         //     }
  //         //   }
  //     // })
  //     // console.log(categoryData)
  // }

  let input;
  useEffect(() => {
    if (!authToken) {
      router.back();
    }
  }, [authToken]);

  const addSection = async (event, value) => {
    event.preventDefault();
    console.log("cccc");

    console.log(name);
    console.log(description);
    // if(id){
    //     updateSection({
    //         variables:{
    //             section:{
    //                 name: name,
    //                 section: description
    //             }
    //         }
    //     })
    // }else{
    await createSection({
      variables: {
        section: {
          name: name,
          // description: description
        },
      },
      refetchQueries: [
        {
          query: GET_ALL_SECTION,
        },
      ],
    });
    // }
    onClose();
    // console.log(sectionData)
    toast({
      title: "Creation d'une section.",
      description: "La classe a été créée avec succes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setName("");
    setDescription("");
  };

  return (
    <Center>
      <Box>
        <Box>
          <Button
            ml={["20px", "50px", "100px", "600px"]}
            rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
            onClick={onOpen}
          >
            Ajouter une Section
          </Button>
        </Box>
        <Box>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            size="xl"
            isCentered
          >
            <AlertDialogOverlay
              closeOnOverlayClick={false}
            >
              <AlertDialogContent width={"440px"}>
                <Box as={"form"} onSubmit={addSection}>
                  <AlertDialogHeader fontSize="sm" fontWeight="base" mt="9px">
                    <Box>
                      <Heading
                        textAlign={"center"}
                        fontSize={["15px", "20px", "24px"]}
                        p="2"
                      >
                        {t("pages.section.sectionCreate.heading")}
                      </Heading>
                    </Box>
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />

                  <AlertDialogBody>
                    <Box>
                      <FormControl>
                        <FormLabel>
                          {t("pages.section.sectionCreate.name")}
                        </FormLabel>
                        <Input
                          id="name"
                          type={"text"}
                          name="name"
                          placeholder="nom"
                          onChange={(event) => setName(event.target.value)}
                          ref={(node) => {
                            input = node;
                          }}
                          value={name}
                          isRequired
                        />
                      </FormControl>
                      {/* <FormControl mt="15px">
                                    <FormLabel>
                                    {t('pages.class.sectionCreate.description')} 
                                    </FormLabel>
                                    <Input 
                                        id="description"
                                        type={'text'} 
                                        name="description"
                                        placeholder="Description"
                                        onChange = {(event) => setDescription(event.target.value)}
                                        ref={node => {input = node;}}
                                        value={description}
                                    />
                                </FormControl> */}
                    </Box>
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                      {t("pages.section.sectionCreate.cancelButton")}
                    </Button>
                    {/* <Link href={'/personnel/ajoutercategorypersonnel'}> */}
                    <Button colorScheme="green" ml={3} type="submit">
                      {t("pages.section.sectionCreate.submitButton")}
                    </Button>
                    {/* </Link>  */}
                  </AlertDialogFooter>
                </Box>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Box>
    </Center>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}
export default SectionCreate;
