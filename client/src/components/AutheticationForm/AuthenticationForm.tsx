import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { Signup } from './Signup';
import { Login } from './Login';

export const AuthenticationForm = () => {
  return (
    <div className='flex justify-center w-full min-h-[700px]'>    
        <Tabs value="login">
            <TabsHeader >
                <Tab value="login">
                    Log in
                </Tab>
                <Tab value="register">
                    Sign up
                </Tab>        
            </TabsHeader>
            <TabsBody>
                <TabPanel value="register">
                    <Signup />
                </TabPanel>
                <TabPanel value="login">
                    <Login />
                </TabPanel>
            </TabsBody>
        </Tabs>
    </div>
  )
}
