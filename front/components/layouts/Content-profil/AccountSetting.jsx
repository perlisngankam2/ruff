import { FormControl, FormLabel, Grid, Input, Select, Text } from "@chakra-ui/react";
import { useAccount } from "../../../contexts/account/Account";
import { GET_PERSONNEL_BY_USERID } from "../../../graphql/Queries";
import { useMutation, useQuery } from '@apollo/client'; 

function AccountSetting(){

    const { account ,loaded } = useAccount();
     const { data: personnelData, called, loading } = useQuery(GET_PERSONNEL_BY_USERID,
     {
    variables:{ userid: account?.id }
  })
    console.log(account)

    return(
        <Grid
            templateColumns={{base:'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={6}
        >
            <FormControl id='nom'>
                <FormLabel>Noms</FormLabel>
                {account?.firstName === null?
                <Text>{personnelData?.getpersonnelbyaccount.firstName} </Text>
                :
                <Text>{account?.firstName} </Text>
                }
            </FormControl>
            <FormControl id='prenom'>
                <FormLabel>Prenoms</FormLabel>
                {account?.lastName === null?
                <Text>{personnelData?.getpersonnelbyaccount.lastName} </Text>
                :
                <Text>{account?.lastName} </Text>
                }
            </FormControl>
            <FormControl id='telephone'>
                <FormLabel>Telephone</FormLabel>
                  {account?.phoneNumber === null?
                <Text>{personnelData?.getpersonnelbyaccount.phoneNumber} </Text>
                :
                <Text>{account?.phoneNumber} </Text>
                }
            </FormControl>
            <FormControl id='adressemail'>
                <FormLabel>Adresse Mail</FormLabel>
                <Text>{account?.email} </Text>
            </FormControl>
            <FormControl id='pays'>
                <FormLabel>Pays</FormLabel>
                <Select focusBorderColor="brand.blue" placeholder="choissisez votre pays">
                    <option value='senegal'>Senegal</option>
                    <option value='Benin'>Benin</option>
                    <option value='Togo'>Togo</option>
                    <option value='Mali'>Mali</option>
                    <option value='cameroun' selected>Cameroun</option>
                    <option value='Algerie'>Algerie</option>

                </Select>
            </FormControl>
            <FormControl id='ville'>
                <FormLabel>Ville</FormLabel>
                <Select focusBorderColor="brand.blue" placeholder="choissisez votre ville">
                    <option value='Yaounde'>Yaounde</option>
                    <option value='Douala' selected>Douala</option>
                    <option value='Buea'>Buea</option>
                    <option value='Bafousam'>Bafousam</option>
                    <option value='Batouri'>Batouri</option>
                </Select>
            </FormControl>


        </Grid>
    )
}
export default AccountSetting