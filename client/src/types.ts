import { ButtonProps, CardProps, InputProps, TypographyProps } from "@material-tailwind/react";

export interface CustomButtonProps extends ButtonProps {
    placeholder?: string;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
}

export  interface CustomTypographyProps extends TypographyProps {
    placeholder?: string;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }
  
  export interface CustomInputProps extends InputProps {
    placeholder?: string;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }
  
  export interface CustomCardProps extends CardProps {
    placeholder?: string;
    crossOrigin?: string;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

 export interface IFormErrors  {
    username: string,
    email: string,
    password: string
  }