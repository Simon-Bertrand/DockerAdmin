'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';

import { signOut } from 'next-auth/react';
import { Flex } from '@tremor/react';
import { ArrowLeftOnRectangleIcon, Bars3Icon, MoonIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';


import LogoComponent from './Logo';

import useDarkTheme from '../hooks/useDarkTheme';


const navigation = [
  { name: 'Home', href: '/', active: (pathname: string) => pathname === "/" },
  { name: 'Containers', href: '/containers', },
  { name: 'Images', href: '/images' },
  { name: 'Swarm', href: '/swarm' }
];



export default function NavbarComponent({ user }: { user: any }) {
  const [isDarkTheme, changeDarkTheme] = useDarkTheme()
  const pathname = usePathname()
  const accountMenu = useRef(null)
  const toggleAccountMenu = () => {
    if (accountMenu.current) {
      if (accountMenu.current.classList.contains("invisible")) {
        accountMenu.current.classList.replace("invisible", "visible")
      } else if (accountMenu.current.classList.contains("visible")) {
        accountMenu.current.classList.replace("visible", "invisible")
      }
    }
  }
  console.log({user})

  return (
    <>
      <div className='navbar'>
        <Flex justifyContent='between' alignItems={undefined} className='h-full w-3/4 mx-auto gap-x-6'>
          <div className='text-xl'>
            <LogoComponent fontSize="text-lg" justifyContent={undefined} />
          </div>
          <Flex justifyContent='start' alignItems={"center"} className={`h-full gap-x-1`}>
            {Object.keys(navigation).map(x => <Link className={`h-full flex items-center text-center px-2 font-light ${(navigation[x].active ?? ((y) => y.startsWith(navigation[x].href)))(pathname) ? "border-b-2 dark:border-white border-black" : ""}`} href={navigation[x].href}>{navigation[x].name}</Link>)}
          </Flex>

          <Flex justifyContent='end' className='gap-x-3'>
            <MoonIcon onClick={(e) => changeDarkTheme()} className='h-6 cursor-pointer' />
            <div className='relative'>
              <div className='h-9 cursor-pointer select-none'>
                <Bars3Icon onClick={toggleAccountMenu} className="h-full" />
              </div>
              <div ref={accountMenu} className='absolute top-12 w-[14vw] -translate-x-[7vw] p-3 overflow-auto rounded card-color-1 invisible z-10'>
                <div className='divide-y-[1px] divide-stone-500'>
                  <div>
                    <h3 className='text-center'>Details</h3>
                    <p className='text-stone-500'>Login :</p><b className='color-text'>{user.login}</b>
                    <span className='text-stone-500 italic text-xs pl-2'>(#{user.id})</span>
                  </div>
                  <div className='py-2 my-2 text-center'>
                    <h3 className='text-center'>Links</h3>
                    <Link href="/accounts" className='text-stone-500'>Manage accounts</Link>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button title="Disconnect" onClick={async () => await signOut()} className="bg-red-500 hover:bg-red-700 w-full py-1 h-8 px-2 rounded">
                    <div className='flex justify-center'>
                      <span>Log out</span>
                      <ArrowLeftOnRectangleIcon height={23} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Flex>
        </Flex>
      </div>
    </>
  );
}

