import { Box, HStack ,Heading , Input, Stack ,Text , Center , Flex} from "@chakra-ui/react";
import axios from "axios";
import { useState , useEffect } from "react";
import Posts from './posts';
import Test from "./test";
import DefaultLayout from "../../components/layouts/DefaultLayout";


const App = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState([1]);
    const [postPerPage, setPostPerPage] = useState(10);


    const [query , setQuery] = useState("");
    const [data, setData] = useState([]);
    const keys = ["first_name", "last_name", "email"];


    // const search = (posts) => {
       
    //     let datas = data.filter((item) =>
    //       keys.some((key) => item[key].toLowerCase().includes(query))
    //     );
    //     //console.log("datas :" , datas)
    //     //return query ? datas.slice(0,5) : Users.slice(0,5)
    //   };

    // useEffect(() => {
    //     const fetchPosts = async() => {
    //         setLoading(true);
    //         const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    //         setPosts(res.data)
    //         setLoading(false);
    //     }
    //     fetchPosts();
    // },[]);

    useEffect(() => {
        const fetchUsers = async () =>{
          const res = await axios.get(`http://192.168.31.135:5500?q=${query}`);
          setPosts(res.data);
        };
        if (query.length === 0 || query.length > 2) fetchUsers()
      },[query]);


    //Get current posts
const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

console.log(posts)

//Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber)


    return <>

    <DefaultLayout>
      <Box p={3} pt="70px">
        <Flex ml={20} p='10' w={'50vw'}>
            <Stack w={'100%'}>
                <Input 
                    type={'text'}
                    variant='flushed' 
                    placeholder="Entrer le nom de l'élève"
                    onChange={(e) =>setQuery(e.target.value)}
                    //onChange={e => setPosts(e.target.value)}
                />
            </Stack>
        </Flex>
        <Stack>
            <Posts posts={currentPosts} loading={loading}/>
            <Test 
                postsPerPage={postPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </Stack> 
    
        
      </Box>
    </DefaultLayout>
    </>
}





export default App ;