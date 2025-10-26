"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const signupSchema = z.object({
  email: z.email("Enter valid email address"),
  name: z.string().min(2, "Name must contain atleast 2 characters"),
  password: z.string().min(1, "Password is required").max(16, "Password cannot exceed 16 characters"),
  confirmPassword: z.string()
})
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Confirm Password must match Password",
    path: ["confirmPassword"]
  });

export const SignupForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: ""
    }
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    const { confirmPassword, ...reqValues } = values;
    await authClient.signUp.email(reqValues, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      }
    });
  }

  return (
    <Card className="justify-center w-[80%] max-w-[500px]">
      <CardHeader className="justify-center text-center">
        <CardTitle>
          Get Started
        </CardTitle>
        <CardDescription>
          Signup To Continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2">
          <Button disabled={isSubmitting} variant={"secondary"}>
            Continue with Google
          </Button>
          <Button disabled={isSubmitting} variant={"secondary"}>
            Continue with GitHub
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-6">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="johndoe@example.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="name">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="johndoe@example.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button disabled={isSubmitting} className="w-full mt-6">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <span>Already have an account?</span>
        <Link href={"/login"} className="ml-2 underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  )
}