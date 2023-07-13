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
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SECTION, UPDATE_SECTION } from "../../graphql/Mutation";
import { GET_ALL_SECTION, GET_SECTION_BY_ID } from "../../graphql/Queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getStaticPropsTranslations } from "../../types/staticProps";
import { useTranslation } from "next-i18next";
import { useAuth } from "../../contexts/account/Auth/Auth";

const SectionCreate = ({
  onCreateSection,
  onUpdateSection,
  section,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [name, setName] = useState(section ? section?.name : "");
  // const [name, setName] = useState("");

  const [description, setDescription] = useState("");
  const cancelRef = React.useRef();
  const { setAuthToken, authToken } = useAuth();
  const [createSection, { error }] = useMutation(CREATE_SECTION);
  const [updateSection] = useMutation(UPDATE_SECTION);
  const { data: dataSectionById, refetch } = useQuery(GET_SECTION_BY_ID);
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
  const [sections, setSection] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (router.query.id) {
      const dataSectionEdit = dataSectionById?.findOnesection;
      if (dataSectionEdit) {
        setSection({
          name: dataSectionEdit.name,
          description: dataSectionEdit.description,
        });
      }
    }
  }, [dataSectionById]);

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
    // await createSection({
    //   variables: {
    //     section: {
    //       name: sections.name,
    //       // description: description
    //     },
    //   },
    //   refetchQueries: [
    //     {
    //       query: GET_ALL_SECTION,
    //     },
    //   ],
    // });
    // }
    if (section) {
      await updateSection({
        variables: {
          id: section.id,
          input: {
            name: name,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_SECTION,
          },
        ],
      });
      refetch();
      // onClose();
      // // console.log(sectionData)
      // toast({
      //   title: "Mise a jour d'une section.",
      //   description: "Section mise a jour avec succes.",
      //   status: "success",
      //   duration: 3000,
      //   isClosable: true,
      // });
    } else {
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
    }
    refetch();
    onClose();
    // console.log(sectionData)
    toast({
      title: "Creation d'une section.",
      description: "Section enregistréée avec succes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setName("");
    setDescription("");
  };

  // const addSection = async (event, value) => {
  //   event.preventDefault();
  //   console.log("cccc");

  //   console.log(name);
  //   console.log(description);
  //   // if(id){
  //   //     updateSection({
  //   //         variables:{
  //   //             section:{
  //   //                 name: name,
  //   //                 section: description
  //   //             }
  //   //         }
  //   //     })
  //   // }else{
  //   // await createSection({
  //   //   variables: {
  //   //     section: {
  //   //       name: sections.name,
  //   //       // description: description
  //   //     },
  //   //   },
  //   //   refetchQueries: [
  //   //     {
  //   //       query: GET_ALL_SECTION,
  //   //     },
  //   //   ],
  //   // });
  //   // }
  //   if (section) {
  //     onUpdateSection(section.id, name)
  //     refetch();
  //     // onClose();
  //     // // console.log(sectionData)
  //     // toast({
  //     //   title: "Mise a jour d'une section.",
  //     //   description: "Section mise a jour avec succes.",
  //     //   status: "success",
  //     //   duration: 3000,
  //     //   isClosable: true,
  //     // });
  //   } else {
  //     onCreateSection(name)
  //   }
  //   refetch();
  //   onClose();
  //   // console.log(sectionData)
  //   toast({
  //     title: "Creation d'une section.",
  //     description: "Section enregistréée avec succes.",
  //     status: "success",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  //   setName("");
  //   setDescription("");
  // };

  return (
    <Center>
      <Box>
        <Box></Box>
        <Box>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            closeOnOverlayClick={false}
            onClose={onClose}
            size="xl"
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent width={"440px"}>
                <Box as={"form"} onSubmit={addSection}>
                  <AlertDialogHeader fontSize="sm" fontWeight="base" mt="9px">
                    <Box>
                      <Heading
                        textAlign={"center"}
                        fontSize={["15px", "20px", "24px"]}
                        p="2"
                      >
                        {section
                          ? "Modifier la section"
                          : "Ajouter une Section"}

                        {/* {t("pages.section.sectionCreate.heading")} */}
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
                          // onChange={(event) =>
                          //   setSection({ ...sections, name: event.target.value })
                          // }
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
                      {/* {t("pages.section.sectionCreate.submitButton")} */}
                      {section ? "Mettre a jour" : "Creerrr"}
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
