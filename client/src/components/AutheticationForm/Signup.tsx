import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Error } from "../miscellaneous/Error";
import { IFormErrors } from "../../types/types";

export function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<IFormErrors>({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const isValidEmail = (email: string) => {
    return email && /\S+@\S+\.\S+/.test(email);
  };

  const isValidUsername = (username: string) => {
    return username && username.length > 3;
  };

  const passwordsMatch = (password: string, confirmPassword: string) => {
    return password && confirmPassword && password === confirmPassword;
  };

  /**
   * Validates the form data and updates the errors state accordingly.
   */
  const validateForm = () => {
    let newErrors = {
      username: "",
      email: "",
      password: ""
    }

    if (!isValidUsername(formData.username)) {
      newErrors = { ...newErrors, username: "Username must have more than 3 characters." };
    }

    if (!isValidEmail (formData.email)) {
      newErrors = { ...newErrors, email: "Please enter a valid email." };
    }
    
    if (!passwordsMatch(formData.password, formData.confirmPassword)) {
      newErrors = { ...newErrors, password: "Passwords do not match" };
    }

    setErrors(newErrors);
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if(name === 'confirmPassword') {
      setErrors({
        ...errors,
        password: ""
      });

      return;
    }

    setErrors({
      ...errors,
      [name]: ""
    });  

  };

  const handleSubmit = async () => {
    if(errors.username || errors.email || errors.password) {
      console.log("invalid form data ");
      console.log(errors);
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

      const response = await fetch(`${apiUrl}/user`, config );
      const data = await response.json();

      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/chat");

      } catch (error) {
        console.log(error);
    }
    
  }

  const handleClick = async () => {  
    validateForm();
    handleSubmit();
  }

  return (
      <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Username
          </Typography>

          <Input
            size="lg"
            name="username"
            placeholder="John Doe"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleChange}
           
          />

          <Error errorMessage={errors.username} className="mt-[-1.2rem]" />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email
          </Typography>

          <Input
            size="lg"
            name="email"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleChange}
      
          />
          <Error errorMessage={errors.email} className="mt-[-1.2rem]" />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
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

          <Error errorMessage={errors.password} className="mt-[-1.2rem]" />

          <Typography variant="h6" color="blue-gray" className="-mb-3"  placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
            Confirm Password
          </Typography>

          <Input
            type="password"
            name="confirmPassword"
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
              <Error errorMessage={errors.password} className="mt-[-1.2rem]" />
        </div>
      

        <Button className="mt-6" fullWidth onClick={handleClick} placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal" placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
          Already have an account?{" "}
          <a href="/" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}
