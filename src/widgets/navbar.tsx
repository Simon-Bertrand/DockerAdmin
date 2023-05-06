'use client';

import { Fragment, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {CloudIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Bold, Flex , Text} from '@tremor/react';
import { ArrowLeftOnRectangleIcon, Bars3Icon, MoonIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { AppContextSchema, useAppContext } from '../context/app';

import LogoComponent from './logo';
import { robotoMedium } from '../fonts/register';
import { useLocalStorage } from 'usehooks-ts';
import useDarkTheme from '../hooks/useDarkTheme';


const navigation = [
  { name: 'Home', href: '/', active : (pathname : string) => pathname === "/"},
  { name: 'Containers', href: '/containers',},
  { name: 'Images', href: '/images'},
  { name: 'Swarm', href: '/swarm'}
];



export default function Navbar({user} : {user:any}) {
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
  
  return (
    <>
      <div className='navbar'>
          <Flex justifyContent='between' alignItems={undefined} className='h-full w-3/4 mx-auto gap-x-6'>
            <div className='text-xl'>
              <LogoComponent fontSize="text-lg" justifyContent={undefined} / >
            </div>
            <Flex justifyContent='start' alignItems={"center"} className={`h-full gap-x-1`}>
              {Object.keys(navigation).map(x => <Link className={`h-full flex items-center text-center px-2 font-light ${(navigation[x].active??((y)=> y.startsWith(navigation[x].href)))(pathname)?"border-b-2 dark:border-white border-black":""}`} href={navigation[x].href}>{navigation[x].name}</Link>)}
            </Flex>
            
            <Flex justifyContent='end' className='gap-x-3'>
              <MoonIcon onClick={(e) => changeDarkTheme()} className='h-6 cursor-pointer' />
              <div className='relative'>
                <div className='h-9 cursor-pointer select-none'>
                  <Bars3Icon onClick={toggleAccountMenu} className="h-full"/>
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
                    <button title="Disconnect" onClick={async ()=> await signOut()} className="bg-red-500 hover:bg-red-700 w-full py-1 h-8 px-2 rounded">
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


{/* <Disclosure as="nav" className="bg-white shadow-sm">
{({ open }) => (
  <>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="flex flex-shrink-0 items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="text-gray-100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                rx="16"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? 'border-slate-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <Image
                  className="h-8 w-8 rounded-full"
                  src={user?.image || 'https://avatar.vercel.sh/leerob'}
                  height={32}
                  width={32}
                  alt={`${user?.name || 'placeholder'} avatar`}
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {user ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex w-full px-4 py-2 text-sm text-gray-700'
                        )}
                        onClick={() => signOut()}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex w-full px-4 py-2 text-sm text-gray-700'
                        )}
                        onClick={() => signIn('github')}
                      >
                        Sign in
                      </button>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="-mr-2 flex items-center sm:hidden">
          <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
            <span className="sr-only">Open main menu</span>
            {open ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </Disclosure.Button>
        </div>
      </div>
    </div>

    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 pt-2 pb-3">
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            className={classNames(
              pathname === item.href
                ? 'bg-slate-50 border-slate-500 text-slate-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
              'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
            )}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4 pb-3">
        {user ? (
          <>
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Image
                  className="h-8 w-8 rounded-full"
                  src={user.image}
                  height={32}
                  width={32}
                  alt={`${user.name} avatar`}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => signOut()}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Sign out
              </button>
            </div>
          </>
        ) : (
          <div className="mt-3 space-y-1">
            <button
              onClick={() => signIn('github')}
              className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </Disclosure.Panel>
  </>
)}
</Disclosure> */}