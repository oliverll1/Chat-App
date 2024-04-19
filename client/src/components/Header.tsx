import { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChatState } from "../Context/ChatProvider";
import { ChatStateProps } from "../types/types";
 

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  const { 
    sidebarRef,
} = ChatState() as ChatStateProps;

 
  const handleWindowResize = () => {
    if (window.innerWidth < 720) {
      setShowHamburger(true);
      return;
    }

    setShowHamburger(false);
    
  }

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleShowSidebar = () => {
    if(!sidebarRef.current) return;
  
    sidebarRef.current.classList.toggle("translate-x-[-100%]");
    setOpenNav(!openNav);
  }
 
  
  return (
    <header className="w-full max-h-[5%] z-20 bg-white">
      <Navbar className="w-full h-full py-3 border-none rounded-none shadow-none">
        <div className="flex items-center justify-start text-blue-gray-900 w-full">
          <Typography
            variant="h2"
            className="mr-4 leading-8"
          >
            NexChat
          </Typography>


          {showHamburger && (
            <IconButton
              variant="text"
              className="ml-auto h-8 w-8 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={handleShowSidebar}
            >
              {openNav ? (
                <XMarkIcon className="h-8 w-8" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-8 w-8" strokeWidth={2} />
              )}
            </IconButton>
          )}
           
        </div>
       
      </Navbar>
    </header>
  )
}
