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
  Select,
  FormControl,
  FormLabel,
  extendTheme,
  Icon,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useState, useMemo, useContext, use } from "react";
import { IoIosAdd } from "react-icons/io";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CYCLE, UPDATE_CYCLE } from "../../graphql/Mutation";
import {
  GET_ALL_SECTION,
  GET_ONE_CYCLE,
  GET_ALL_CYCLE,
  GET_CYCLE_BY_ID,
} from "../../graphql/Queries";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GlobalContext } from "../../contexts/cyclesection/AppContext";
import { useAuth } from "../../contexts/account/Auth/Auth";
// import { getStaticPropsTranslations } from "../../types/staticProps";

// const CycleSchema = {
//     name: "pearl",
//     section: "cm2"
// }

// const FormData =  CycleSchema

// export const CycleProps = {
//     defaultValues: FormData,
//     onSubmit: (value = FormData) => {}
// };
 
// export const CycleProps = {
//     defaultValues:formData,
//      onSubmit:(value = formData) => {}
// }

const CycleCreate = ({ isOpenCycle, onOpenCycle, onCloseCycle, cycle }) => {
  const [name, setName] = useState(cycle ? cycle.name : "");
  console.log(cycle);
  const [sectionId, setSectionId] = useState(cycle ? cycle.sectionId : "");
  // const { isOpen:isOpenCycle, onOpen:onOpenCycle, onClose:onCloseCycle } = useDisclosure();
  const cancelRef = React.useRef();
  const { setAuthToken, authToken } = useAuth();
  const [createCycle, { error }] = useMutation(CREATE_CYCLE);
  const [updateCycle] = useMutation(UPDATE_CYCLE);
  // const [editCycle] = useMutation(UPDATE_CYCLE);
  // const [id, setId] = useState(null)
  // const { cyleById } = useQuery(GET_ONE_CYCLE);
  const { data } = useQuery(GET_ALL_SECTION);
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  const [isformOpen, setIsFormOpen] = useState(false);
  const { data: dataCycleById } = useQuery(GET_CYCLE_BY_ID, {
    variables: { id: router.query.id },
  });
  // const cycleContext = useContext(GlobalContext);

  console.log(sectionId);

  useEffect(() => {
    const dataCycleEdit = dataCycleById?.findOnecycle;
    if (dataCycleEdit) {
      setSectionId(dataCycleEdit.sectionId);
    }
  });

  // const {
  //     handleSubmit,
  //     setValue
  //   } = FormData({
  //     resolver : CycleSchema,
  //     defaultValues: {
  //       ...defaultValues
  //     }
  //   });
  //   const onSubmitCycleForm = handleSubmit(async (values) => {
  //     try {
  //        onSubmit?.(values);
  //       setValue('name', '');
  //       setValue('section', '');

  //       toast({
  //         description: "submit first form",
  //         status: 'success',
  //         isClosable: true
  //       });
  //     } catch (error) {
  //       const message = formatError(error);

  //       toast({
  //         position: 'top-right',
  //         description: t([`errors:api.${message}`, 'errors:api.default']),
  //         status: 'error',
  //         isClosable: true
  //       });
  //     }
  //   });
  // const updateCache = (cache, { dataCycle: { editCycle } }) => {
  //         cache.modify({
  //           fields: {
  //             cycle(existingCycle = []) {
  //               const newCycleRef = cache.writeFragment({
  //                 dataCycle: editCycle,
  //                 fragment: gql`
  //                   fragment NewCycle on Cycle {
  //                     id
  //                     name
  //                     description
  //                   }
  //                 `
  //               });
  //               return [...existingCycle, newCycleRef];
  //             }
  //           }
  //         });
  //       }

  const addCycle = async (event) => {
    event.preventDefault();
    console.log("cccc");
    console.log(name);
    console.log(sectionId);
    if (!cycle) {
      await createCycle({
        variables: {
          cycle: {
            name: name,
            sectionId: sectionId,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_CYCLE,
          },
        ],
      });
    } else {
      await updateCycle({
        variables: {
          id: cycle.id,
          input: {
            name: name,
            sectionId: sectionId,
          },
        },
      });
    }
    onCloseCycle();
    toast({
      title: "Creation d'un cycle.",
      description: "Le cylce a éte crée avec succes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push("/class/cyclesection");
    setName("");
    //   sectionId("");
  };

  useEffect(() => {
    console.log(data?.findAllsection);
    console.log("j");
  }, [data]);

  // useEffect(() => {
  //   if (!authToken) {
  //     router.back();
  //   }
  //   console.log(dataCycleById);
  // }, [authToken]);

  return (
    <Center>
      <Box>
        <AlertDialog
          isOpen={isOpenCycle}
          leastDestructiveRef={cancelRef}
          closeOnOverlayClick={false}
          onClose={onCloseCycle}
          size="xl"
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent width={"440px"}>
              <Box as={"form"} onSubmit={addCycle}>
                <AlertDialogHeader fontSize="sm" fontWeight="base" mt="9px">
                  <Box>
                    <Heading
                      textAlign={"center"}
                      fontSize={["15px", "20px", "24px"]}
                      p="2"
                    >
                      {t("pages.cycle.cycleCreate.heading")}
                    </Heading>
                  </Box>
                </AlertDialogHeader>
                <AlertDialogCloseButton />

                <AlertDialogBody>
                  <Box>
                    <FormControl>
                      <FormLabel>{t("pages.cycle.cycleCreate.name")}</FormLabel>
                      <Input
                        type={"text"}
                        name="name"
                        placeholder="nom"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        isRequired
                      />
                    </FormControl>
                    <FormControl mt="15px">
                      <FormLabel>
                        {t("pages.cycle.cycleCreate.sectionName")}
                      </FormLabel>
                      <Select
                        name="sectionId"
                        placeholder="Section"
                        onChange={(event) => setSectionId(event.target.value)}
                        value={sectionId}
                        isRequired
                      >
                        {data &&
                          data.findAllsection.map((section, index) => (
                            <option
                              selected={
                                sectionId == section.id ? "selected" : ""
                              }
                              value={section?.id}
                              key={index}
                            >
                              {/* {console.log(cycle.sectionName)} */}
                              {section.name}
                              {console.log(sectionId)}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={onCloseCycle}
                    colorScheme="red"
                  >
                    {t("pages.cycle.cycleCreate.cancelButton")}
                  </Button>
                  {/* <Link href={'/personnel/ajoutercategorypersonnel'}> */}
                  <Button colorScheme="green" ml={3} type="submit">
                    {t("pages.cycle.cycleCreate.submitButton")}
                  </Button>
                  {/* </Link>  */}
                </AlertDialogFooter>
              </Box>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Center>
  );
};

// export async function getStaticProps({ locale }) {
//     return {
//       props: {
//         ...(await getStaticPropsTranslations(locale)),
//         // Will be passed to the page component as props
//       },
//     };
//   }

export default CycleCreate;
