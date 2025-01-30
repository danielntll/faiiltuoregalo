"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContextLanguage } from "@/context/contextLanguage";
import { text } from "./text";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 ">
          <form className="p-6 md:p-8 sm:w-[400px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{text[l].title}</h1>
                <p className="text-balance text-muted-foreground">
                  {text[l].subtitle}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{text[l].input.email.label}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={text[l].input.email.ph}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    {text[l].input.password.label}
                  </Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {text[l].input.password.forgot}
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {text[l].button.login}
              </Button>

              <div className="text-center text-sm">
                {text[l].button.register.text}
                <a href="#" className="underline underline-offset-4">
                  {text[l].button.register.action}
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
