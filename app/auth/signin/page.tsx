'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SignInPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        name,
        isSignUp: isSignUp.toString(),
        redirect: false,
      });

      if (result?.error) {
        setError(isSignUp ? 'Failed to sign up. User may already exist.' : 'Invalid email or password');
      } else if (result?.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background grain mesh-gradient dot-pattern flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md border-border shadow-xl relative z-10 p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-linear-to-r bg-primary bg-clip-text text-transparent mb-2">
            Nudge
          </CardTitle>
          <CardDescription className="text-base">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  placeholder="Your name"
                  className="border-border focus-visible:ring-ring"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="border-border focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="border-border focus-visible:ring-ring"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r bg-primary hover:bg-primary/90 py-4"
            >
              {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-primary hover:text-primary"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
