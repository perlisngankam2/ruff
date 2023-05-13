import { Button, FormControl, FormLabel, Grid, Input, Select, Text } from "@chakra-ui/react";
import { useAccount } from "../../../contexts/account/Account";
import { GET_PERSONNEL_BY_USERID } from "../../../graphql/Queries";
import { useMutation, useQuery } from '@apollo/client'; 
import Link from "next/link";
import Routes from "../../../modules/routes";

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
                <FormLabel fontWeight={"bold"}>Noms</FormLabel>
                {account?.firstName === null?
                <Input
                value={personnelData?.getpersonnelbyaccount.firstName}
                bg='gray.100'
                />
                :
                <Input
                value={account?.firstName}
                bg='gray.100'
                />
            
                }
            </FormControl>
            <FormControl id='prenom'>
                <FormLabel fontWeight={"bold"}>Prenoms</FormLabel>
                {account?.lastName === null?
                <Input
                value={personnelData?.getpersonnelbyaccount.lastName}
                bg='gray.100'
                />
                :
                <Input
                value={account?.lastName}
                bg='gray.100'
                />
               
                }
            </FormControl>
            <FormControl id='telephone'>
                <FormLabel fontWeight={"bold"}>Telephone</FormLabel>
                  {account?.phoneNumber === null?
 <Input
                value={personnelData?.getpersonnelbyaccount.phoneNumber}
                bg='gray.100'
                />
                :
                <Input
                value={account?.phoneNumber}
                bg='gray.100'
                />
                }
            </FormControl>
            <FormControl id='adressemail'>
                <FormLabel fontWeight={"bold"}>Adresse Mail</FormLabel>
                 <Input
                value={account?.email}
                bg='gray.100'
                />
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

                  {/* <Button w='250px' mt='5' background="colors.primary" color='white'>
                            <Link href= {{
                                    pathname: Routes.ResetPassword?.path || '',
                                    query: {id: account?.id }
                                }}>Modifier votre mot de passe
                            </Link>
                  </Button> */}
        </Grid>
    )
}
export default AccountSetting