import {
  Box,
  Heading,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Center,
} from "@chakra-ui/react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Trans, useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ModifierPersonnel = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      fonctionDate: "",
      gender: "",
      status: "",
      phoneNumber: "",
      maritalStatus: "",
      salary: "",
      teacherCategory: "",
      childNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Ce champ est requis"),
      lastName: Yup.string().required("Ce champ est requis"),
      birthDate: Yup.date("Ce champ est requis"),
      fonctionDate: Yup.date("Ce champ est requis"),
      gender: Yup.string().required("Ce champ est requis"),
      status: Yup.string().required("Ce champ est requis"),
      phoneNumber: Yup.string().required("Ce champ est requis"),
      maritalStatus: Yup.string().required("Ce champ est requis"),
      salary: Yup.number().required("Ce champ est requis"),
      teacherCategory: Yup.string().required("Ce champ est requis"),
      childNumber: Yup.number().required("Ce champ est requis"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(formik.errors);

  const { t } = useTranslation();
  const router = useRouter();

  return (
    <DefaultLayout>
      <Box background="colors.tertiary" width={"100%"}>
        <Center>
          <Box
            borderWidth="1px"
            borderColor={"gray.400"}
            width={"900px"}
            p={6}
            mt="100px"
            backgroundColor={"white"}
            rounded="md"
          >
            <Box as={"form"} onSubmit={formik.handleSubmit}>
              <Box>
                <Heading textAlign={"center"} mb="30px">
                  Formulaire de modification du personnel
                </Heading>
              </Box>
              <Flex>
                <FormControl mr="5%">
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.firstName')} */}
                    Nom
                  </FormLabel>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Nom"
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                  {formik.errors.firstName ? (
                    <Text>{formik.errors.firstName}</Text>
                  ) : null}
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.lastName')} */}
                    Prenom
                  </FormLabel>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Prénom"
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                  {formik.errors.lastName ? (
                    <Text>{formik.errors.lastName}</Text>
                  ) : null}
                </FormControl>
              </Flex>

              <FormControl mt="2%">
                <FormLabel fontWeight={"normal"}>
                  {/* {t('components.school.Register.gender')} */}
                  Sexe
                </FormLabel>
                <Select
                  id="gender"
                  name="gender"
                  autoComplete="country"
                  placeholder="Sexe"
                  borderColor="purple.100"
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                >
                  <option>Homme</option>
                  <option>Femme</option>
                  <option>Autres</option>
                </Select>
                {/* <FormHelperText>ll never share your email.</FormHelperText> */}
                {formik.errors.gender ? (
                  <Text>{formik.errors.gender}</Text>
                ) : null}
              </FormControl>
              <Flex mt="2%">
                <FormControl mr="5%">
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.birthDate')} */}
                    Date de naissance
                  </FormLabel>
                  <Input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    placeholder="Date de naissance"
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.birthDate}
                  />
                  {formik.errors.birthDate ? (
                    <Text>{formik.errors.birthDate}</Text>
                  ) : null}
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.institute')} */}
                    Date de prise de fonction
                  </FormLabel>
                  <Input
                    type="date"
                    id="fonctionDate"
                    name="fonctionDate"
                    placeholder="Date de prise de fonction"
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.fonctionDate}
                  />
                  {formik.errors.fonctionDate ? (
                    <Text>{formik.errors.fonctionDate}</Text>
                  ) : null}
                </FormControl>
              </Flex>
              <Flex mt="2%">
                <FormControl>
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.salary')} */}
                    Salaire
                  </FormLabel>
                  <Input
                    id="salary"
                    type="number"
                    name="salary"
                    placeholder="Salaire"
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.salary}
                  />
                  {/* <FormHelperText>ll never share your email.</FormHelperText> */}
                  {formik.errors.salary ? (
                    <Text>{formik.errors.salary}</Text>
                  ) : null}
                </FormControl>
                <FormControl ml={"44px"}>
                  <FormLabel>
                    {/* {t('components.school.Register.gender')} */}
                    Category du personnel
                  </FormLabel>
                  <Select
                    id="teacherCategory"
                    name="teacherCategory"
                    placeholder="Category du personnel"
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.teacherCategory}
                    width={"403px"}
                  >
                    <option>Principal</option>
                    <option>Econome</option>
                    <option>Enseignant</option>
                    <option>Surveillant</option>
                  </Select>
                  {formik.errors.teacherCategory ? (
                    <Text>{formik.errors.teacherCategory}</Text>
                  ) : null}
                </FormControl>
              </Flex>
              <Flex mt="2%">
                <FormControl mr="5%">
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.maritalStatus')} */}
                    Status du personnel
                  </FormLabel>
                  <Select
                    id="status"
                    name="status"
                    placeholder="Status "
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.status}
                    width={"403px"}
                  >
                    <option>Permanent</option>
                    <option>Vaccataire</option>
                  </Select>
                  {formik.errors.status ? (
                    <Text>{formik.errors.status}</Text>
                  ) : null}
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.phoneNumber')} */}
                    Telephone
                  </FormLabel>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Numero de téléphone"
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                  />
                  {formik.errors.phoneNumber ? (
                    <Text>{formik.errors.phoneNumber}</Text>
                  ) : null}
                </FormControl>
              </Flex>
              <Flex mt="2%">
                <FormControl>
                  <FormLabel fontWeight={"normal"}>
                    {/* {t('components.school.Register.maritalStatus')} */}
                    Status matrimonial
                  </FormLabel>
                  <Select
                    id="maritalStatus"
                    name="maritalStatus"
                    placeholder="Status matrimonial"
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.maritalStatus}
                    width={"403px"}
                  >
                    <option>Celibataire</option>
                    <option>Marie</option>
                    <option>Marie(e)</option>
                    <option>Autres</option>
                  </Select>
                  {formik.errors.maritalStatus ? (
                    <Text>{formik.errors.maritalStatus}</Text>
                  ) : null}
                </FormControl>
                <FormControl ml={"44px"}>
                  <FormLabel>
                    {/* {t('components.school.Register.gender')} */}
                    Nombre d'enfant
                  </FormLabel>
                  <Select
                    id="childNumber"
                    name="childNumber"
                    placeholder="Nombre d'enfants"
                    borderColor="purple.100"
                    onChange={formik.handleChange}
                    value={formik.values.childNumber}
                    width={"403px"}
                  >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Select>
                  {formik.errors.childNumber ? (
                    <Text>{formik.errors.childNumber}</Text>
                  ) : null}
                </FormControl>
              </Flex>
              <ButtonGroup mt="3%" w="100%">
                <Flex w="100%" justifyContent="space-between">
                  <Flex></Flex>
                  <Button
                    type="submit"
                    w="7rem"
                    colorScheme="red"
                    variant="solid"
                    onClick={() => router.push("/personnel")}
                  >
                    Submit
                  </Button>
                </Flex>
              </ButtonGroup>
            </Box>
          </Box>
        </Center>
      </Box>
    </DefaultLayout>
  );
};

export default ModifierPersonnel;
