import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useAuth } from '../../store/AuthContext'
import { useUi } from 'store/ui_store'
import NavLink from 'components/global/NavLink'
import CloseIcon from 'components/global/CloseIcon'
import MenuIcon from 'assets/images/MenuIcon'
import Logo from 'assets/images/ProtegeLogo'

const GlobalHeader = () => {
  const router = useRouter()
  const location = useRouter().route
  const { currentUser, signout } = useAuth()
  const isNavOpen = useUi((s) => s.isNavOpen)
  const setIsNavOpen = useUi((s) => s.setIsNavOpen)
  const isUserMenuOpen = useUi((s) => s.isUserMenuOpen)
  const setIsUserMenuOpen = useUi((s) => s.setIsUserMenuOpen)

  useEffect(() => {
    const handleRouteChange = () => {
      setIsNavOpen(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await signout()
      router.push('/')
    } catch (error) {
      console.log('Sign Out Error:', error)
    }
  }

  return (
    <header className='py-3'>
      <div className='container relative flex items-center justify-between px-6 xl:px-2'>
        <Link href='/'>
          <a className='w-2/3 md:w-56'>
            <Logo className='w-full' />
          </a>
        </Link>

        <button
          className='absolute right-0 w-12 h-12 p-2 mr-4 text-blue-900 lg:hidden'
          aria-label='navigation'
          onClick={() => setIsNavOpen(!isNavOpen)}
          type='button'
        >
          <MenuIcon />
        </button>

        <nav
          data-cy='mobile-nav'
          className={`${
            isNavOpen ? 'translate-0' : 'translate-x-full'
          } lg:hidden fixed w-screen max-w-md top-0 right-0 flex flex-row transform transition duration-150 ease-in-out z-50`}
        >
          <button
            className='flex items-center justify-center w-16 mt-8 ml-2 text-blue-900 bg-white rounded-full shadow-md h-14 lg:hidden'
            aria-label='navigation'
            onClick={() => setIsNavOpen(!isNavOpen)}
            type='button'
          >
            <CloseIcon />
          </button>

          <ul className='w-full h-screen ml-2 bg-white shadow-xl'>
            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                href='/'
                className='opacity-75 hover:opacity-100'
                activeClassName='opacity-100'
              >
                Home
              </NavLink>
            </li>
            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                href='/job-board'
                className='opacity-75 hover:opacity-100'
                activeClassName='opacity-100'
              >
                Find a Job
              </NavLink>
            </li>

            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                className='opacity-75 hover:opacity-100'
                href='/learning-resources'
                activeClassName='opacity-100'
              >
                Learning Resources
              </NavLink>
            </li>

            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                className='opacity-75 hover:opacity-100'
                href='/get-in-touch'
                activeClassName='opacity-100'
              >
                Get in Touch
              </NavLink>
            </li>

            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                className='opacity-75 hover:opacity-100'
                href='/contributors'
                activeClassName='opacity-100'
              >
                Contributors
              </NavLink>
            </li>
            <li className='px-6 py-4 border-b border-gray-300'>
              <Link href='/post-a-job?status=1'>
                <a className='btn btn-teal'>Post a Job</a>
              </Link>
            </li>
          </ul>
        </nav>

        <nav
          data-cy='desktop-nav'
          className='z-50 flex flex-col hidden font-semibold text-blue-900 uppercase lg:block'
          role='navigation'
        >
          <ul className='flex items-center justify-between mb-4'>
            <li className='pr-4 cursor-pointer menu-item quick-filter lg:pr-10'>
              <NavLink
                href='/job-board'
                className='py-3 border-b-2 border-transparent opacity-75 hover:opacity-100'
                activeClassName='border-teal-500'
              >
                Find a Job
              </NavLink>
              <ul
                data-cy='quick-filter'
                className='absolute p-4 mt-2 bg-white rounded shadow-md submenu'
                aria-label='submenu'
              >
                <li className='mb-3'>
                  <NavLink
                    href='/job-board?filter=Front-end'
                    className='w-full pb-1 duration-75 border-b border-transparent opacity-75 submenu-item hover:opacity-100 hover:border-teal-500'
                  >
                    Front-end
                  </NavLink>
                </li>
                <li className='mb-3'>
                  <NavLink
                    href='/job-board?filter=Back-end'
                    className='w-full pb-1 duration-75 border-b border-transparent opacity-75 submenu-item hover:opacity-100 hover:border-teal-500'
                  >
                    Back-end
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href='/job-board?filter=Full-stack'
                    className='w-full pb-1 duration-75 border-b border-transparent opacity-75 submenu-item hover:opacity-100 hover:border-teal-500'
                  >
                    Full-stack
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='pr-4 opacity-75 menu-item lg:pr-10 hover:opacity-100'>
              <NavLink
                href='/learning-resources'
                className='py-3 duration-75 border-b-2 hover:border-teal-500 '
                activeClassName='border-teal-500'
                inactiveClassName='border-transparent'
              >
                Learning Resources
              </NavLink>
            </li>

            <li className='pr-4 opacity-75 menu-item lg:pr-10 hover:opacity-100'>
              <NavLink
                href='/get-in-touch'
                className='py-3 duration-75 border-b-2 hover:border-teal-500 '
                activeClassName='border-teal-500'
                inactiveClassName='border-transparent'
              >
                Get in Touch
              </NavLink>
            </li>

            <li className='pr-4 opacity-75 menu-item lg:pr-10 hover:opacity-100'>
              <NavLink
                href='/contributors'
                className='py-3 duration-75 border-b-2 hover:border-teal-500 '
                activeClassName='border-teal-500'
                inactiveClassName='border-transparent'
              >
                Contributors
              </NavLink>
            </li>

            <li className='pr-4 opacity-75 menu-item hover:opacity-100'>
              <Link href='/post-a-job?status=1'>
                <a className='btn btn-teal'>Post a Job</a>
              </Link>
            </li>

            {currentUser ? (
              <li>
                <div className='hidden md:block'>
                  <div className='flex items-center'>
                    <div className='relative ml-3'>
                      <span className='sr-only'>Open user menu</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        width='32px'
                        height='32px'
                        className='w-8 h-8 cursor-pointer'
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      >
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {isUserMenuOpen ? (
                  <div
                    class='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu'
                  >
                    <a
                      href='#'
                      class='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      Your Profile
                    </a>

                    <a
                      href='#'
                      class='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      Settings
                    </a>

                    <a
                      href='#'
                      class='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                      onClick={handleSignOut}
                    >
                      Sign out
                    </a>
                  </div>
                ) : null}
              </li>
            ) : null}
          </ul>

          {!currentUser ? (
            <ul className='flex items-center justify-end pr-5 space-x-3 text-xs'>
              <li>
                <Link href='/sign-in'>
                  <a>Sign In</a>
                </Link>
              </li>
              <li>
                <Link href='/sign-up'>
                  <a>Sign Up</a>
                </Link>
              </li>
            </ul>
          ) : null}
        </nav>
      </div>
    </header>
  )
}

export default GlobalHeader
