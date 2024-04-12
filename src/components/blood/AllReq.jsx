import React,{useState, useEffect} from 'react'
import bloodServices from '../../appwrite/blood'
import ReqCard from './ReqCard'
import { Link } from 'react-router-dom'

function AllReq() {

    const [posts, setPosts] = useState([])
    const [bloodGroupFilter, setBloodGroupFilter] = useState("")
    const [locationFilter, setLocationFilter] = useState("")
    const [filteredPosts, setFilteredPosts] = useState([]);
    
    
    useEffect(() => {
        if(!posts.length){
            bloodServices.getMessages([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    setFilteredPosts(posts.documents)
                    // console.log(posts);
                }
            })
        }
        
    }, [])
    

    const applyFilter = (e) => {
        e.preventDefault()
        const filteredData = posts.filter((post) => {
            const groupMatch = bloodGroupFilter ? post.group.toLowerCase().includes(bloodGroupFilter.toLowerCase()) : true;
            const locationMatch = locationFilter ? post.location.toLowerCase().includes(locationFilter.toLowerCase()) : true;
            return groupMatch && locationMatch;
          });
          setFilteredPosts(filteredData);
          
    }
    
    return (
        <div className="flex w-full min-h-[410px]">
            <div className="w-1/4 p-4 flex-shrink-0 border-r-2">
                <h1 className="text-xl my-3">Filter Blood Requests</h1>
                <form onSubmit={applyFilter}>
                <div className="mb-4">
                    <input
                        type="text"
                        value={bloodGroupFilter}
                        onChange={(e) => setBloodGroupFilter(e.target.value)}
                        placeholder="Search by Blood Group"
                        className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        placeholder="Search by Location"
                        className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button type='submit'
                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Apply Filters
                </button>
                </form>

            </div>
            <div className="flex-1 p-4 overflow-y-auto max-h-[800px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(bloodGroupFilter || locationFilter) && !filteredPosts.length ? (
                        <div className='w-full h-96 flex justify-center text-xl mx-[90%]'>
                            No Such Requests Available
                        </div>
                    ) : filteredPosts.length ? filteredPosts.map((post) => (
                        <Link to={`/blood-req/${post.$id}`} key={post.$id} className="p-2 min-w-72">
                            <ReqCard {...post} />
                        </Link>
                    )) : (
                        <div 
                        className="w-full h-96 flex justify-center text-xl mx-[90%]"
                        >
                            Loading...
                        </div>
                    )}
                </div>
            </div>
        </div>
      )
}

export default AllReq