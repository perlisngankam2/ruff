import { FormControl, FormLabel, Grid, Input, Select, Text } from "@chakra-ui/react";
import { useAccount } from "../../../contexts/account/Account"

function AccountSetting(){

    const { account ,loaded } = useAccount();
    console.log(account)

    return(
        <Grid
            templateColumns={{base:'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={6}
        >
            <FormControl id='nom'>
                <FormLabel>Noms</FormLabel>
                <Text>{account?.firstName} </Text>
            </FormControl>
            <FormControl id='prenom'>
                <FormLabel>Prenoms</FormLabel>
                <Input focusBorderColor="brand.blue" type="text" placeholder='Willfried'/>
            </FormControl>
            <FormControl id='telephone'>
                <FormLabel>Telephone</FormLabel>
                <Input focusBorderColor="brand.blue" type="tel" placeholder='(+237) 656 39 18 82'/>
            </FormControl>
            <FormControl id='adressemail'>
                <FormLabel>Adresse Mail</FormLabel>
                <Input focusBorderColor="brand.blue" type="email" placeholder='donwillfried@gmail.com'/>
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