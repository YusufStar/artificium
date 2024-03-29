"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icons from "@/icons";
import Image from "next/image";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  {
    /* First Name, Last Name, Passowrd, Repeat Password, Profile photo and Email - formik and yup use */
  }
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
    repeatPassword: Yup.string().required("Repeat Password is required"),
    terms_and_conditions: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
    profilePhoto: Yup.string(),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    profilePhoto: "",
    terms_and_conditions: false,
  };

  const onSubmit = (values: any) => {
    setLoading(true);
    axios
      .post("/api/auth/register", {
        ...values,
      })
      .then((res) => {
        if (res.data?.action === "error") {
          res.data?.field?.map((field: any) => {
            formik.setFieldError(field, res.data?.message);
          });
        }

        if (res.data?.action === "redirect") {
          router.push(res.data?.url);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="mobile-screen sm:h-screen overflow-hidden w-full flex">
      <div className="flex-1 flex flex-col justify-between items-center p-36 sm:p-48">
        {/* Top bar */}
        <div className="h-fit w-full flex items-center justify-between">
          <Icons name="logo" />

          <Link
            href={"/login"}
            className="from-[#82DBF7] text-14 2xl:text-base bg-gradient-to-tr inline-block to-[#B6F09C] text-transparent bg-clip-text font-semibold"
          >
            Log In
          </Link>
        </div>

        <div className="flex flex-col items-center w-full max-w-screen-md">
          <h1 className="font-normal text-30 2xl:text-36">
            Connect with your team and bring your creative ideas to life.
          </h1>

          {/* FORM (formik and yup) email and password login*/}
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
            <div className="flex flex-col gap-2 mb-[24px] w-full"></div>

            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col">
                <Label
                  htmlFor="email"
                  className="text-nobbleBlack-300 text-16 font-medium mb-2"
                >
                  Email
                </Label>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email ? (
                  <span className="text-xs font-semibold text-red-500 mt-2">
                    {formik.errors.email}
                  </span>
                ) : null}
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full">
                  <Label
                    htmlFor="firstName"
                    className="text-nobbleBlack-300 text-16 font-medium mb-2"
                  >
                    First Name
                  </Label>
                  <Input
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.firstName && formik.errors.firstName ? (
                    <span className="text-xs font-semibold text-red-500 mt-2">
                      {formik.errors.firstName}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-col w-full">
                  <Label
                    htmlFor="lastName"
                    className="text-nobbleBlack-300 text-16 font-medium mb-2"
                  >
                    Last Name
                  </Label>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.lastName && formik.errors.lastName ? (
                    <span className="text-xs font-semibold text-red-500 mt-2">
                      {formik.errors.lastName}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full">
                  <Label
                    htmlFor="password"
                    className="text-nobbleBlack-300 text-16 font-medium mb-2"
                  >
                    Password
                  </Label>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.password && formik.errors.password ? (
                    <span className="text-xs font-semibold text-red-500 mt-2">
                      {formik.errors.password}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-col w-full">
                  <Label
                    htmlFor="repeatPassword"
                    className="text-nobbleBlack-300 text-16 font-medium mb-2"
                  >
                    Repeat Password
                  </Label>
                  <Input
                    placeholder="Repeat Password"
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.repeatPassword &&
                  formik.errors.repeatPassword ? (
                    <span className="text-xs font-semibold text-red-500 mt-2">
                      {formik.errors.repeatPassword}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="my-[32px] 2xl:my-[48px] flex items-start flex-col justify-between">
              {/* Remember me Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms_and_conditions"
                  name="terms_and_conditions"
                  checked={formik.values.terms_and_conditions}
                  onBlur={formik.handleBlur}
                  onCheckedChange={(checked) => {
                    formik.setFieldValue("terms_and_conditions", checked);
                  }}
                  className={`${
                    formik.touched.terms_and_conditions &&
                    formik.errors.terms_and_conditions
                      ? "border-red-500"
                      : "border-nobbleBlack-500"
                  }`}
                />

                <Label
                  htmlFor="terms_and_conditions"
                  className="text-nobbleBlack-300 text-12 xl:text-base font-medium"
                >
                  I agree to the{" "}
                  <span className="text-stemGreen-500 font-semibold">
                    Terms and Conditions
                  </span>
                </Label>
              </div>

              {formik.touched.terms_and_conditions &&
              formik.errors.terms_and_conditions ? (
                <span className="text-xs font-semibold text-red-500 mt-2">
                  {formik.errors.terms_and_conditions}
                </span>
              ) : null}
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="bg-stemGreen-500 hover:bg-stemGreen-500/80 font-semibold text-dayBlue-900"
            >
              {loading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create free account"
              )}
            </Button>
          </form>
        </div>

        <div className="h-fit w-full items-center justify-between flex">
          <h1 className="text-nobbleBlack-300 font-medium text-14">
            Artificium.app © 2024
          </h1>

          <span className="text-nobbleBlack-300 text-14 font-medium">
            Privacy Policy
          </span>
        </div>
      </div>

      {/* just view desktop screen */}
      <div className="flex-[0.75] relative hidden xl:flex">
        <Image
          src="/static_images/abstract-02.png"
          alt="Register Abstract"
          className="rounded-l-24"
          quality={100}
          fill
        />
      </div>
    </div>
  );
};

export default Register;
