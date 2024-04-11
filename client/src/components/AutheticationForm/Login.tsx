import { useState } from "react";

import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Error } from "../miscellaneous/Error";
  
  export function Login() {
    const [formData, setFormData] = useState({
      email: "",
      password: ""
    });

    const [error , setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    /**
     * Validates the form data and updates the errors state accordingly.
     *
     * @param {void} 
     * @return {void} 
     */
  
    const handleSubmit = async () => {
  
      if(!formData.email || !formData. password) {
        console.log("Fill all the fields");
        return;
      }
  
      try {
        const config = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        };
  
        const response = await fetch(`${apiUrl}/user/login`, config );

        if (!response.ok) {
          setError('Invalid Email or Password');
          return;
        }

        const data = await response.json();       
        localStorage.setItem("userInfo", JSON.stringify(data));
  
        navigate("/chat");
  
        } catch (error) {
          console.log(error);
      }
      
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    

    return (
       <Card color="transparent" shadow={false} placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
        <Typography variant="h4" color="blue-gray"  placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
          Log in
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3"  placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
              Email
            </Typography>

            <Input
              size="lg"
              name="email"
              placeholder="John Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
              onPointerEnterCapture={null} 
              onPointerLeaveCapture={null} 
              crossOrigin={null}  
            />        

            <Typography variant="h6" color="blue-gray" className="-mb-3"  placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
              Password
            </Typography>

            <Input
              type="password"
              name="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
              onPointerEnterCapture={null} 
              onPointerLeaveCapture={null} 
              crossOrigin={null}            
            />
          </div>

          <Error errorMessage={error} className="mb-2" />
  
          <Button className="mt-6" fullWidth onClick={handleSubmit} placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
            Log in
          </Button>
        </form>
      </Card>
    );
  }
