import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactNode } from "react"

export interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  // Traductions
  title?: string
  description?: string
  emailLabel?: string
  emailPlaceholder?: string
  passwordLabel?: string
  forgotPasswordText?: string
  forgotPasswordHref?: string
  loginButtonText?: string
  dividerText?: string
  noAccountText?: string
  signUpText?: string
  signUpHref?: string
  
  // Personnalisation
  titleClassName?: string
  descriptionClassName?: string
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  buttonClassName?: string
  showSocialLogin?: boolean
  showSignUp?: boolean
  
  // Contenu personnalisé
  socialLoginButton?: ReactNode
  afterForm?: ReactNode
  
  // Validation
  emailRequired?: boolean
  passwordRequired?: boolean
  
  // Handlers
  onForgotPassword?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onSignUp?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export interface LoginLayoutProps {
  // Contenu du formulaire
  form: ReactNode
  
  // Logo et titre
  logo?: ReactNode
  logoHref?: string
  
  // Image de fond
  backgroundImage?: string
  backgroundImageAlt?: string
  backgroundClassName?: string
}

export function LoginForm({
  className,
  // Traductions
  title = "Login to your account",
  description = "Enter your email below to login to your account",
  emailLabel = "Email",
  emailPlaceholder = "m@example.com",
  passwordLabel = "Password",
  forgotPasswordText = "Forgot your password?",
  forgotPasswordHref = "#",
  loginButtonText = "Login",
  dividerText = "Or continue with",
  noAccountText = "Don't have an account?",
  signUpText = "Sign up",
  signUpHref = "#",
  
  // Personnalisation
  titleClassName = "text-2xl font-bold",
  descriptionClassName = "text-balance text-sm text-muted-foreground",
  buttonVariant = "default",
  buttonClassName = "w-full",
  showSocialLogin = true,
  showSignUp = true,
  
  // Contenu personnalisé
  socialLoginButton,
  afterForm,
  
  // Validation
  emailRequired = true,
  passwordRequired = true,
  
  // Handlers
  onForgotPassword,
  onSignUp,
  
  ...props
}: LoginFormProps) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className={titleClassName}>{title}</h1>
        <p className={descriptionClassName}>
          {description}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">{emailLabel}</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={emailPlaceholder} 
            required={emailRequired} 
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">{passwordLabel}</Label>
            <a
              href={forgotPasswordHref}
              className="ml-auto text-sm underline-offset-4 hover:underline"
              onClick={onForgotPassword}
            >
              {forgotPasswordText}
            </a>
          </div>
          <Input id="password" type="password" required={passwordRequired} />
        </div>
        <Button type="submit" variant={buttonVariant} className={buttonClassName}>
          {loginButtonText}
        </Button>
        
        {showSocialLogin && (
          <>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                {dividerText}
              </span>
            </div>
            
            {socialLoginButton ? (
              socialLoginButton
            ) : (
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Login with GitHub
              </Button>
            )}
          </>
        )}
      </div>
      
      {showSignUp && (
        <div className="text-center text-sm">
          {noAccountText}{" "}
          <a 
            href={signUpHref} 
            className="underline underline-offset-4"
            onClick={onSignUp}
          >
            {signUpText}
          </a>
        </div>
      )}
      
      {afterForm}
    </form>
  )
}

export function LoginLayout({
  form,
  logo,
  logoHref = "/",
  backgroundImage = "/images/nb-cleaner.jpg",
  backgroundImageAlt = "Login background",
  backgroundClassName = "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
}: LoginLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {logo && (
          <div className="flex justify-center gap-2 md:justify-start">
            <a href={logoHref} className="flex items-center gap-3 font-medium">
              {logo}
            </a>
          </div>
        )}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {form}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={backgroundImage}
          alt={backgroundImageAlt}
          className={backgroundClassName}
        />
      </div>
    </div>
  )
}
