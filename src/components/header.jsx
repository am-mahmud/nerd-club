// 'use client'
// import Link from 'next/link'
// import { Logo } from '@/components/logo'
// import { Menu, X, User, LogOut } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import React from 'react'
// import { cn } from '@/lib/utils'
// import { useSession, signOut } from "next-auth/react";

// export const HeroHeader = () => {
//     const [menuState, setMenuState] = React.useState(false)
//     const [isScrolled, setIsScrolled] = React.useState(false)
//     const { data: session } = useSession();

//     const publicMenuItems = [
//         { name: 'Home', href: '/' },
//         { name: 'Posts', href: '/posts' },
//         { name: 'About', href: '/about' },
//     ]

//     const protectedMenuItems = [
//         { name: 'Dashboard', href: '/dashboard' },
//         { name: 'Manage Posts', href: '/manage-posts' },
//         { name: 'Add Post', href: '/add-post' }
//     ]


//     const menuItems = session 
//         ? [...publicMenuItems, ...protectedMenuItems]
//         : publicMenuItems;

//     React.useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 50)
//         }
//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [])

    
//     const handleLinkClick = () => {
//         setMenuState(false)
//     }


//     React.useEffect(() => {
//         if (menuState) {
//             document.body.style.overflow = 'hidden'
//         } else {
//             document.body.style.overflow = 'unset'
//         }
//         return () => {
//             document.body.style.overflow = 'unset'
//         }
//     }, [menuState])

//     return (
//         <header>
//             {menuState && (
//                 <div 
//                     className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                     onClick={() => setMenuState(false)}
//                 />
//             )}

//             <nav className="fixed z-50 w-full px-2">
//                 <div
//                     className={cn(
//                         'mx-auto mt-2 max-w-6xl px-4 sm:px-6 transition-all duration-300 lg:px-12',
//                         isScrolled && 'bg-background/90 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
//                     )}
//                 >
//                     <div className="relative flex items-center justify-between py-3 lg:py-4">
                       
//                         <Link 
//                             href="/" 
//                             aria-label="home" 
//                             className="flex items-center space-x-2 z-50"
//                             onClick={handleLinkClick}
//                         >
//                             <Logo />
//                         </Link>

                       
//                         <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
//                             <ul className="flex gap-6 xl:gap-8 text-sm">
//                                 {menuItems.map((item, index) => (
//                                     <li key={index}>
//                                         <Link
//                                             href={item.href}
//                                             className="text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium"
//                                         >
//                                             {item.name}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

                       
//                         <div className="hidden lg:flex items-center gap-3">
//                             {session ? (
//                                 <>
//                                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
//                                         <User className="size-4 text-muted-foreground" />
//                                         <span className="text-sm font-medium max-w-[120px] truncate">
//                                             {session.user?.name}
//                                         </span>
//                                     </div>
//                                     <Button
//                                         onClick={() => signOut({ callbackUrl: '/' })}
//                                         variant="outline"
//                                         size="sm"
//                                         className="gap-2"
//                                     >
//                                         <LogOut className="size-4" />
//                                         Logout
//                                     </Button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Button
//                                         asChild
//                                         variant="ghost"
//                                         size="sm"
//                                     >
//                                         <Link href="/login">Login</Link>
//                                     </Button>
//                                     <Button asChild size="sm">
//                                         <Link href="/register">Sign Up</Link>
//                                     </Button>
//                                 </>
//                             )}
//                         </div>

                       
//                         <button
//                             onClick={() => setMenuState(!menuState)}
//                             aria-label={menuState ? 'Close Menu' : 'Open Menu'}
//                             className="relative z-50 p-2 lg:hidden hover:bg-muted rounded-lg transition-colors"
//                         >
//                             <Menu
//                                 className={cn(
//                                     "size-6 transition-all duration-200",
//                                     menuState && "rotate-90 scale-0 opacity-0"
//                                 )}
//                             />
//                             <X
//                                 className={cn(
//                                     "absolute inset-0 m-auto size-6 transition-all duration-200",
//                                     menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
//                                 )}
//                             />
//                         </button>
//                     </div>
//                 </div>


//                 <div
//                     className={cn(
//                         "fixed top-0 right-0 h-screen w-[280px] bg-background border-l shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-40",
//                         menuState ? "translate-x-0" : "translate-x-full"
//                     )}
//                 >
//                     <div className="flex flex-col h-full pt-20 pb-6 px-6">
                    
//                         {session && (
//                             <div className="mb-6 pb-6 border-b">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                                         <User className="size-5 text-primary" />
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <p className="text-sm font-semibold truncate">
//                                             {session.user?.name}
//                                         </p>
//                                         <p className="text-xs text-muted-foreground truncate">
//                                             {session.user?.email}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         <nav className="flex-1 overflow-y-auto">
//                             <ul className="space-y-1">
//                                 {menuItems.map((item, index) => (
//                                     <li key={index}>
//                                         <Link
//                                             href={item.href}
//                                             onClick={handleLinkClick}
//                                             className="block px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 font-medium"
//                                         >
//                                             {item.name}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </nav>

                    
//                         <div className="pt-6 border-t space-y-2">
//                             {session ? (
//                                 <Button
//                                     onClick={() => {
//                                         signOut({ callbackUrl: '/' });
//                                         handleLinkClick();
//                                     }}
//                                     variant="outline"
//                                     className="w-full gap-2"
//                                 >
//                                     <LogOut className="size-4" />
//                                     Logout
//                                 </Button>
//                             ) : (
//                                 <>
//                                     <Button
//                                         asChild
//                                         variant="outline"
//                                         className="w-full"
//                                     >
//                                         <Link href="/login" onClick={handleLinkClick}>
//                                             Login
//                                         </Link>
//                                     </Button>
//                                     <Button
//                                         asChild
//                                         className="w-full"
//                                     >
//                                         <Link href="/register" onClick={handleLinkClick}>
//                                             Sign Up
//                                         </Link>
//                                     </Button>
//                                 </>
//                             )}
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
import { Menu, X, User, LogOut, LayoutDashboard, FileText, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useSession, signOut } from "next-auth/react";

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { data: session } = useSession();

    const publicMenuItems = [
        { name: 'Home', href: '/', icon: null },
        { name: 'Posts', href: '/posts', icon: FileText },
        { name: 'About', href: '/about', icon: null },
    ]

    const protectedMenuItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Manage Posts', href: '/manage-posts', icon: FileText },
        { name: 'Add Post', href: '/add-post', icon: PlusCircle }
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
            {/* Backdrop overlay for mobile menu */}
            {menuState && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
                    onClick={() => setMenuState(false)}
                />
            )}

            <nav className="fixed z-50 w-full px-2 sm:px-4">
                <div
                    className={cn(
                        'mx-auto mt-2 max-w-6xl px-4 sm:px-6 transition-all duration-300 lg:px-12',
                        isScrolled && 'bg-background/95 max-w-5xl rounded-2xl border backdrop-blur-xl shadow-lg lg:px-8'
                    )}
                >
                    <div className="relative flex items-center justify-between py-3 lg:py-4">
                        {/* Logo - Fixed width to prevent shift */}
                        <div className="flex-shrink-0 z-50">
                            <Link 
                                href="/" 
                                aria-label="home" 
                                className="flex items-center space-x-2"
                                onClick={handleLinkClick}
                            >
                                <Logo />
                            </Link>
                        </div>

                        {/* Desktop Menu - Centered with fixed positioning */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                            <ul className="flex items-center gap-1 xl:gap-2">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150 whitespace-nowrap"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Desktop Auth Buttons - Fixed width container */}
                        <div className="hidden lg:flex items-center gap-2 min-w-[200px] justify-end">
                            {session ? (
                                <>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border">
                                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium max-w-[100px] truncate">
                                            {session.user?.name}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        variant="ghost"
                                        size="sm"
                                        className="gap-2 hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="hidden xl:inline">Logout</span>
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

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                            className="relative z-50 p-2 lg:hidden hover:bg-muted rounded-lg transition-colors"
                        >
                            <Menu
                                className={cn(
                                    "w-6 h-6 transition-all duration-200",
                                    menuState && "rotate-90 scale-0 opacity-0"
                                )}
                            />
                            <X
                                className={cn(
                                    "absolute inset-0 m-auto w-6 h-6 transition-all duration-200",
                                    menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                                )}
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Drawer - Professional Design */}
                <div
                    className={cn(
                        "fixed top-0 right-0 h-screen w-full max-w-[320px] bg-background border-l shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-40",
                        menuState ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="flex flex-col h-full">
                        {/* Header with User Info */}
                        <div className="px-6 pt-20 pb-4 border-b bg-muted/30">
                            {session ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
                                        <User className="w-6 h-6 text-primary" />
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
                            ) : (
                                <div className="text-center py-2">
                                    <p className="text-sm text-muted-foreground">
                                        Sign in to access all features
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 overflow-y-auto px-4 py-4">
                            <div className="space-y-1">
                                {/* Public Links */}
                                {publicMenuItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            onClick={handleLinkClick}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 font-medium group"
                                        >
                                            {Icon && (
                                                <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                            )}
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}

                                {/* Protected Links - Show only when logged in */}
                                {session && protectedMenuItems.length > 0 && (
                                    <>
                                        <div className="px-4 pt-4 pb-2">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                Your Workspace
                                            </p>
                                        </div>
                                        {protectedMenuItems.map((item, index) => {
                                            const Icon = item.icon;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={item.href}
                                                    onClick={handleLinkClick}
                                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all duration-150 font-medium group"
                                                >
                                                    {Icon && (
                                                        <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                                    )}
                                                    <span>{item.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        </nav>

                        {/* Footer Actions */}
                        <div className="p-4 border-t bg-muted/30">
                            {session ? (
                                <Button
                                    onClick={() => {
                                        signOut({ callbackUrl: '/' });
                                        handleLinkClick();
                                    }}
                                    variant="outline"
                                    className="w-full gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </Button>
                            ) : (
                                <div className="space-y-2">
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
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}