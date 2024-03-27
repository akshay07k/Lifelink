import React from 'react'
import { Input, Button } from "../index"
import { useForm } from 'react-hook-form';
import bloodServices from '../../appwrite/blood';
import { useSelector } from 'react-redux';

function Form() {

    const { register, handleSubmit } = useForm()
    const user = useSelector((state) => state.auth.userData)

    const submit = async(data) => {
        const payload = {...data, user_id: user.$id}
        // console.log(payload);
        const message = await bloodServices.createMessage(payload)
        if(message){
            console.log("message created");
        }
    };

  return (
    <div className="bg-white w-2/6 p-6 rounded-lg absolute 
    top-28 left-1/2 transform -translate-x-1/2 mt-16 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 py-2 
      w-full border-b">Blood Request Form</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className='space-y-4'>
        <Input 
            label="Name: "
            placeholder="Enter your name"
            type="text"
            {...register("name", {
                required: true,
            })}
        />
        <Input
            label="Blood Group:"
            placeholder="Enter your blood group"
            type="text"
            {...register("group", {
                required: true,
            })}
        />
        <Input
            label="Location:"
            placeholder="Enter your location"
            type="text"
            {...register("location", {
                required: true,
            })}
        />
        <Input
            label="Phone No:"
            placeholder="Enter your phone number"
            type="tel"
            {...register("phno", {
                required: true,
            })}
        />
        <Button
            type="submit"
            className='w-full px-[40%]'
        >Submit
        </Button>
        </div>
      </form>
    </div>
  )
}

export default Form