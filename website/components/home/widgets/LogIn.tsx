'use client';

import { useEffect, useRef, useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import {  Button, Card, Flex , Grid, Text, TextInput} from '@tremor/react';
import LogoComponent from './Logo';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function LogInComponent({} : {}) {
  const router = useRouter()
  const [error, setError] = useState("")

  const onConnect = async (e) => {
    e.preventDefault()
    signIn("credentials", {
      ...Object.fromEntries(new FormData(e.target)),
      redirect:false,
    })
    .then(x=> {
      if (x?.error === null && x?.status==200) {
        router.push("/")
      } else {
        setError(x?.error??"")
        setTimeout(()=> {
          setError("")
        },5000)
        toast.error("Could not connect with the given credentials")
      }
    })
  }



  return (
    <>
      <Card className='w-[50%] mx-auto bg-dockeradmin-lightgrey dark:bg-dockeradmin-darkgrey_secondary shadow-2xl	dark:shadow-none'>
        <Grid className='w-1/2 mx-auto gap-4'>
          <LogoComponent fontSize='text-xl' justifyContent='center' />
          <h1 className={`pt-2 text-lg`}>Credentials</h1>
          <form onSubmit={onConnect} className="flex-inline space-y-4">
            <TextInput name='login' placeholder="Login" autoComplete="login" error={error=="CredentialsSignin"}  />
            <TextInput name="password" type='password' autoComplete="password" error={error=="CredentialsSignin"} errorMessage={error=="CredentialsSignin"? "Wrong credentials":""} placeholder="Password"  />
            <Flex justifyContent='end'>
              <Button size="md" >
                Connect
              </Button>
            </Flex>
      
          </form>
        </Grid>
    </Card>
    </>
  );
}

export default LogInComponent

