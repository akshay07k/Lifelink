import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import conf from '../conf/conf';
import { ID, Query, Permission, Role} from 'appwrite';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';



const Room = () => {
    const [messageBody, setMessageBody] = useState('')
    const [messages, setMessages] = useState([])
    const user = useSelector((state) => state.auth.userData)
    // console.log("user", user);


    useEffect(() => {
        getMessages();
      
        const unsubscribe = service.client.subscribe(`databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents`, response => {

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('A MESSAGE WAS CREATED')
                setMessages(prevState => [...prevState, response.payload])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('A MESSAGE WAS DELETED!!!')
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        console.log('unsubscribe:', unsubscribe)
      
        return () => {
          unsubscribe();
        };
      }, []);


    const getMessages = async () => {
        const response = await service.getMessages()
        // console.log(response.documents)
        setMessages(response.documents)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('MESSAGE:', messageBody)

        const permissions = [
            Permission.write(Role.user(user.$id)),
          ]

        const payload = {
            user_id:user.$id,
            username:user.name,
            body:messageBody
        }

        const response = await service.createMessage(payload)

        console.log('RESPONSE:', response)

        // setMessages(prevState => [response, ...prevState])

        setMessageBody('')

    }

    const deleteMessage = async (id) => {
        await service.deleteMessage(id)
        //setMessages(prevState => prevState.filter(message => message.$id !== message_id))
     } 

  return (
        
    <div className="flex flex-col min-h-[500px] items-center 
    justify-center bg-gray-100 py-12">
      <div className="w-3/5 border rounded-lg overflow-hidden 
      bg-white">
        <div className="border-b p-4">
          <h1 className="text-2xl font-semibold">Chat</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
    <div 
        key={message.$id} 
        className={`flex 
        justify-${message.$permissions.includes(`delete(\"user:${user.$id}\")`) ? 'end' : 'start'} mb-4`}
    >
        <div className={`max-w-xs mx-2 
        ${message.$permissions.includes(`delete(\"user:${user.$id}\")`) ? 'items-end' : 'items-start'}`}>

            <p className="text-xs text-gray-500 mb-1">
                {message.username}</p>

            <div className={`relative inline-block px-4 py-2 rounded-lg 
            ${message.$permissions.includes(`delete(\"user:${user.$id}\")`) ? 'bg-green-400 text-black' : 'bg-gray-200 text-gray-700'}`}>
                <p className="text-sm">{message.body}</p>
                <span className="text-xs text-gray-400">
                    {new Date(message.$createdAt).toLocaleString()}</span>
            </div>
            {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                <button 
                    className="text-sm text-red-500 focus:outline-none"
                    onClick={() => deleteMessage(message.$id)}
                >
                    <DeleteIcon/>
                </button>
            )}
        </div>
    </div>
))}


    </div>

    <form id="message--form" onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center border-t pt-4 mt-4">
            <textarea 
                required 
                placeholder="Say something..." 
                onChange={(e) => setMessageBody(e.target.value)}
                value={messageBody}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
            ></textarea>
            
            <div className="ml-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none">Send</button>
            </div>
        </div>
    </form>
</div>
</div>

  )
}

export default Room