"use client";

import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setMessage("Invalid email or password");
                setLoading(false);
            } else {
                setMessage("Login successful!");
                router.push('/dashboard');
                router.refresh();
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setMessage("Redirecting to Google..");
        try {
            await signIn("google", { callbackUrl: '/' });
        } catch (error) {
            setMessage("Google login failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <section className="flex min-h-screen px-4 py-16 md:py-32">
            <div className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="p-8 pb-6">
                    <div>
                        <Link href="/" aria-label="go home">
                            <LogoIcon />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Welcome Back</h1>
                        <p className="text-sm">Sign in to your account to continue</p>
                    </div>

                    <form className="mt-6 grid grid-cols-1">
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="0.98em"
                                height="1em"
                                viewBox="0 0 256 262">
                                <path
                                    fill="#4285f4"
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path
                                    fill="#34a853"
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path
                                    fill="#fbbc05"
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                <path
                                    fill="#eb4335"
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                            <span>Continue with Google</span>
                        </Button>
                    </form>

                    <hr className="my-4 border-dashed" />

                    {message && (
                        <div className={`mb-4 p-3 rounded text-sm ${
                            message.includes('Invalid') || message.includes('failed')
                                ? 'bg-red-50 text-red-600 border border-red-200'
                                : 'bg-green-50 text-green-600 border border-green-200'
                        }`}>
                            {message}
                        </div>
                    )}

                    {/* Login Form - Now properly wrapped */}
                    <form 
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email" className="block text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm">
                                Password
                            </Label>
                            <Input
                                type="password"
                                required
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <Button 
                            onClick={handleLogin} 
                            className="w-full" 
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </div>

                <div className="bg-muted rounded-lg border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Don't have an account?
                        <Button asChild variant="link" className="px-2">
                            <Link href="/register">Sign Up</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </section>
    );
}