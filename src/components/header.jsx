// 'use client'
// import Link from 'next/link'
// import { Logo } from '@/components/logo'
// import { Menu, X } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import React from 'react'
// import { cn } from '@/lib/utils'
// import { useSession, signOut } from "next-auth/react";



// export const HeroHeader = () => {
//     const [menuState, setMenuState] = React.useState(false)
//     const [isScrolled, setIsScrolled] = React.useState(false)
//     const { data: session } = useSession();

//     const menuItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Posts', href: '/posts' },
//     { name: 'About', href: '/about' },

// ]

// if (session) {
//   menuItems.push(
//     { name: 'Dashboard', href: '/dashboard' },
//     { name: 'Manage Post', href: '/manage-posts' },
//     { name: 'Add Post', href: '/add-post' }
//   );
// }

//     React.useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 50)
//         }
//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [])
//     return (
//         <header>
//             <nav data-state={menuState && 'active'} className="fixed z-20 w-full px-2">
//                 <div
//                     className={cn(
//                         'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
//                         isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
//                     )}>
//                     <div
//                         className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
//                         <div className="flex w-full justify-between lg:w-auto">
//                             <Link href="/" aria-label="home" className="flex items-center space-x-2">
//                                 <Logo />
//                             </Link>

//                             <button
//                                 onClick={() => setMenuState(!menuState)}
//                                 aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
//                                 className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
//                                 <Menu
//                                     className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
//                                 <X
//                                     className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
//                             </button>
//                         </div>

//                         <div className="absolute inset-0 m-auto hidden size-fit lg:block">
//                             <ul className="flex gap-8 text-sm">
//                                 {menuItems.map((item, index) => (
//                                     <li key={index}>
//                                         <Link
//                                             href={item.href}
//                                             className="text-muted-foreground hover:text-accent-foreground block duration-150">
//                                             <span>{item.name}</span>
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div
//                             className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
//                             <div className="lg:hidden">
//                                 <ul className="space-y-6 text-base">
//                                     {menuItems.map((item, index) => (
//                                         <li key={index}>
//                                             <Link
//                                                 href={item.href}
//                                                 className="text-muted-foreground hover:text-accent-foreground block duration-150">
//                                                 <span>{item.name}</span>
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             <div
//                                 className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit"
//                             >
//                                 {session ? (
                                   
//                                     <Button
//                                         onClick={() => signOut()}
//                                         // variant="outline"
//                                         size="sm"
//                                         className={cn(isScrolled && "lg:hidden")}
//                                     >
//                                         Logout
//                                     </Button>
//                                 ) : (
                                    
//                                     <>
//                                         <Button
//                                             asChild
//                                             variant="outline"
//                                             size="sm"
//                                             className={cn(isScrolled && "lg:hidden")}
//                                         >
//                                             <Link href="/login">Login</Link>
//                                         </Button>

//                                         <Button
//                                             asChild
//                                             size="sm"
//                                             className={cn(isScrolled && "lg:hidden")}
//                                         >
//                                             <Link href="/register">Sign Up</Link>
//                                         </Button>

//                                         <Button
//                                             asChild
//                                             size="sm"
//                                             className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
//                                         >
//                                             <Link href="/register">Get Started</Link>
//                                         </Button>
//                                     </>
//                                 )}
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// }


'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useSession, signOut } from "next-auth/react";

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { data: session } = useSession();

    const publicMenuItems = [
        { name: 'Home', href: '/' },
        { name: 'Posts', href: '/posts' },
        { name: 'About', href: '/about' },
    ]

    const protectedMenuItems = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Manage Posts', href: '/manage-posts' },
        { name: 'Add Post', href: '/add-post' }
    ]


    const menuItems = session 
        ? [...publicMenuItems, ...protectedMenuItems]
        : publicMenuItems;

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    
    const handleLinkClick = () => {
        setMenuState(false)
    }


    React.useEffect(() => {
        if (menuState) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [menuState])

    return (
        <header>
            {menuState && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMenuState(false)}
                />
            )}

            <nav className="fixed z-50 w-full px-2">
                <div
                    className={cn(
                        'mx-auto mt-2 max-w-6xl px-4 sm:px-6 transition-all duration-300 lg:px-12',
                        isScrolled && 'bg-background/90 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
                    )}
                >
                    <div className="relative flex items-center justify-between py-3 lg:py-4">
                       
                        <Link 
                            href="/" 
                            aria-label="home" 
                            className="flex items-center space-x-2 z-50"
                            onClick={handleLinkClick}
                        >
                            <Logo />
                        </Link>

                       
                        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
                            <ul className="flex gap-6 xl:gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                       
                        <div className="hidden lg:flex items-center gap-3">
                            {session ? (
                                <>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                                        <User className="size-4 text-muted-foreground" />
                                        <span className="text-sm font-medium max-w-[120px] truncate">
                                            {session.user?.name}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                    >
                                        <LogOut className="size-4" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <Link href="/login">Login</Link>
                                    </Button>
                                    <Button asChild size="sm">
                                        <Link href="/register">Sign Up</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                       
                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                            className="relative z-50 p-2 lg:hidden hover:bg-muted rounded-lg transition-colors"
                        >
                            <Menu
                                className={cn(
                                    "size-6 transition-all duration-200",
                                    menuState && "rotate-90 scale-0 opacity-0"
                                )}
                            />
                            <X
                                className={cn(
                                    "absolute inset-0 m-auto size-6 transition-all duration-200",
                                    menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                                )}
                            />
                        </button>
                    </div>
                </div>


                <div
                    className={cn(
                        "fixed top-0 right-0 h-screen w-[280px] bg-background border-l shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-40",
                        menuState ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="flex flex-col h-full pt-20 pb-6 px-6">
                    
                        {session && (
                            <div className="mb-6 pb-6 border-b">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="size-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate">
                                            {session.user?.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {session.user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <nav className="flex-1 overflow-y-auto">
                            <ul className="space-y-1">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            onClick={handleLinkClick}
                                            className="block px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                    
                        <div className="pt-6 border-t space-y-2">
                            {session ? (
                                <Button
                                    onClick={() => {
                                        signOut({ callbackUrl: '/' });
                                        handleLinkClick();
                                    }}
                                    variant="outline"
                                    className="w-full gap-2"
                                >
                                    <LogOut className="size-4" />
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <Link href="/login" onClick={handleLinkClick}>
                                            Login
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        className="w-full"
                                    >
                                        <Link href="/register" onClick={handleLinkClick}>
                                            Sign Up
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}