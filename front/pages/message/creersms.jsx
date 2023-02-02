import {
    Box,
    Heading,
    ButtonGroup,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Center,
    VStack,
    Stack,
    Textarea,
    Checkbox
  } from "@chakra-ui/react";

  import {
    Select,
    CreatableSelect,
    AsyncSelect,
    OptionBase,
    GroupBase
  } from "chakra-react-select";
  import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import FormSelect from "../../components/atoms/FormSelect";

const CreerSms = () => {

  const colorOptions = [
    { value: "blue", label: "Blue", color: "#0052CC" },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630" },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" }
  ];
  
  const router = useRouter();
  // export declare type OnChangeValue<Option, IsMulti extends boolean> = IsMulti extends true ? MultiValue<Option> : SingleValue<Option>;
  
// const groupedOptions = [
//     {
//       label: "Colours",
//       value: colorOptions
//     },
//     // {
//     //   label: "Flavours",
//     //   value: flavorOptions
//     // }
//   ];

  // closeMenuOnSelect: boolean;

  // isMulti: IsMulti;

    return(
        <DefaultLayout>
        <Box 
          pt="70px"
          width="full" 
          background="colors.tertiary"
         >
          <Center>
            <VStack
              boxShadow="md"
              rounded="md"
              p="10"
              background="white"
              mt={5}
              width={['700px', '700px', '820px']}
            >
              <Heading color={"colors.primary"}>Ecrirez votre méssage</Heading>
              <Stack
                gap={2}
                align="start"
                direction={["column", "column", "column"]}
              >
                <VStack 
                  as="form"
                  gap={4} 
                  mt={6}
                >
                  <Stack 
                    gap={4} 
                    width={["650px","650px","750px"]}
                  > 
                    <FormControl>
                      <FormLabel>Ajoutez le (s) destinataire(s):</FormLabel>
                      <FormSelect />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Ajoutez le(s) groupes:</FormLabel>
                      <FormSelect
                      />
                    </FormControl>
                  </Stack>
                    <Box  
                    width={["650px","650px","750px"]}
                    > 
                      <Checkbox >Envoyez a tout le monde</Checkbox>
                    </Box > 
                    <Stack width={["650px","650px","750px"]}> 
                      <FormControl mb={4}>
                        <FormLabel>Objet du message:</FormLabel>
                          <Input
                              placeholder=" Entrez l'objet du message"
                          />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Message:</FormLabel>
                        <Textarea
                            placeholder='Ecrivez votre message ici'
                            height={'120px'}  
                          />
                      </FormControl>
                  </Stack>
                </VStack>
                <VStack gap={2}>
                  <Flex gap={5} pt="30px">
                    <Button colorScheme="red" onClick={() => router.back()}>
                      Annuler
                    </Button>
                    <Button
                      colorScheme="green"
                      onClick={() => router.push("/class")}
                    >
                      Envoyer
                    </Button>
                  </Flex>
                </VStack>
              </Stack>
            </VStack>
          </Center>
        </Box>
      </DefaultLayout>
    )

}

export default CreerSms;