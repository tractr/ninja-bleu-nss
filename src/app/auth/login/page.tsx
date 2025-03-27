'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import supabaseClient from '@/lib/supabase-client';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const codeExchangeInProgress = useRef(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const t = useTranslations();

  useEffect(() => {
    const handleAuthParams = async () => {
      // Check for code in query params
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code && !codeExchangeInProgress.current) {
        codeExchangeInProgress.current = true;
        setIsLoading(true);
        try {
          // Remove code from URL
          params.delete('code');
          const newUrl =
            window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
          window.history.replaceState({}, '', newUrl);

          // TODO: handle exchangeCodeForSession error and display error of redirect user with next router (no window.location.href) if data is returned

          await supabaseClient.auth.exchangeCodeForSession(code);

          const next = params.get('next') || '/';
          queryClient.invalidateQueries();
          setIsRedirecting(true);
          router.push(next);
        } catch (error) {
          console.error('Error exchanging code for session:', error);
          setError('root.serverError', {
            message: t('auth.authError'),
          });
        } finally {
          setIsLoading(false);
        }
        return;
      }

      // Handle hash params for other auth flows
      if (window.location.hash) {
        setIsLoading(true);
        try {
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          const type = hashParams.get('type');

          if (accessToken && refreshToken) {
            const {
              data: { user },
              error,
            } = await supabaseClient.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) throw error;

            if (user) {
              let next: string = '/';

              if (type === 'invite') {
                next = '/change-password';
              } else {
                // Get the next parameter from URL
                const params = new URLSearchParams(window.location.search);
                next = params.get('next') || next;
              }

              queryClient.invalidateQueries();
              setIsRedirecting(true);
              router.push(next);
            }
          }
        } catch (error) {
          console.error('Error setting session:', error);
          setError('root.serverError', {
            message: t('auth.authError'),
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleAuthParams();
  }, [router, queryClient, setError, t]);

  const onSubmit = async (input: LoginFormInputs) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const { error } = await supabaseClient.auth.signInWithPassword(input);
      if (error) throw error;
      
      // Invalidate queries and mark as redirecting before navigation
      queryClient.invalidateQueries();
      reset();
      setIsRedirecting(true);

      // Get the next parameter from URL
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next') || '/';
      
      // Navigate to the next page
      router.push(next);
    } catch (error) {
      console.log(error);
      setError('root.serverError', { message: (error as Error).message });
      setIsLoading(false);
      setIsRedirecting(false);
    }
  };

  // Si nous sommes en train de rediriger, afficher un écran de chargement
  if (isRedirecting) {
    return (
      <div className="grid min-h-svh place-items-center bg-muted/50">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Image 
              src="/images/logo-180x180.webp" 
              alt={t('common.logo')} 
              width={100} 
              height={100}
              className="animate-pulse" 
            />
          </div>
          <h2 className="text-lg font-medium text-muted-foreground">
            {t('auth.redirecting')}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-3 font-medium">
            <div className="flex h-10 w-10 items-center justify-center">
              <Image src="/images/logo-180x180.webp" alt={t('common.logo')} width={40} height={40} />
            </div>
            <span className="font-bold text-ninja-blue">Admin NinjaBleu</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t('auth.signInTitle')}</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  {t('auth.signInDescription')}
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('auth.emailLabel')}</Label>
                  <Input
                    {...register('email', {
                      required: t('auth.emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('auth.emailInvalid'),
                      },
                    })}
                    id="email"
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
                    <a
                      href="/auth/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      {t('auth.forgotPassword')}
                    </a>
                  </div>
                  <Input
                    {...register('password', {
                      required: t('auth.passwordRequired'),
                      minLength: {
                        value: 6,
                        message: t('auth.passwordMinLength'),
                      },
                    })}
                    id="password"
                    type="password"
                    placeholder={t('auth.passwordPlaceholder')}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.signInLoading')}
                    </>
                  ) : (
                    t('auth.signInButton')
                  )}
                </Button>
                {errors.root?.serverError && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.root.serverError.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/images/nb-cleaner.jpg"
          alt="Ninja Bleu background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
