import { Typography } from '@material-tailwind/react';

interface ErrorProps {
    errorMessage: string,
    className?: string
}

export const Error = ({errorMessage, className}: ErrorProps) => {
  return (
    <>
        <Typography className={className}variant="small" color="red" placeholder={null} onPointerEnterCapture={null} onPointerLeaveCapture={null}>
            {errorMessage}
        </Typography >
    </>
  )
}
