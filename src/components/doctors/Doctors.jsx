import React,{useEffect} from 'react'
import service from '../../appwrite/config';



function Doctors() {

  
  useEffect( () => {
    async function displayUserNames() {
      try {
          const users = await service.teamMembers();
          if(users)
          console.log(users);
      } catch (error) {
          console.error('Error fetching user names:', error);
      }
  }
  
  displayUserNames();
  }, [])
  

  return (
    <div>Doctors</div>
  )
}

export default Doctors