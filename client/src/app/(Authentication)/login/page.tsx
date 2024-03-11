"use client";
import Icons from "@/icons";
import Image from "next/image";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { Input } from "@/components/ui/input";

const LogIn = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  {
    /* Formik And Yup */
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values: any) => {
    setLoading(true);
    axios
      .post("/api/auth/login", {
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
        <div className="h-fit w-full flex items-center">
          <Icons name="logo" />
        </div>

        <div className="flex flex-col items-center w-full max-w-screen-sm">
          <div className="flex flex-col gap-24 w-full items-start mb-[48px] 2xl:mb-[64px]">
            <h1 className="font-normal text-34 2xl:text-36 flex gap-1">
              Let s
              <span className="font-bold from-[#4D62E5] via-[#87DDEE] bg-gradient-to-t inline-block to-[#B6F09C] text-transparent bg-clip-text">
                creative!
              </span>
            </h1>

            <p className="text-nobbleBlack-300 font-medium text-base 2xl:text-18">
              Log in to Artificium to start creating magic.
            </p>
          </div>

          {/* FORM (formik and yup) email and password login*/}
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
            <div className="flex flex-col gap-2 mb-[24px] w-full">
              <Input
                placeholder="Email"
                type="email"
                name="email"
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

            <div className="flex flex-col gap-2 w-full">
              <Input
                placeholder="Password"
                type="password"
                name="password"
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

            <div className="my-[32px] 2xl:my-[48px] flex items-center justify-between">
              {/* Remember me Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  className="bg-nobbleBlack-600 w-[24px] border border-nobbleBlack-500 h-[24px]"
                />

                <label
                  htmlFor="remember"
                  className="text-nobbleBlack-200 text-14 2xl:text-base font-medium"
                >
                  Remember me
                </label>
              </div>

              {/* Forgot password linear gradient colored text */}
              <span className="font-bold from-[#82DBF7] bg-gradient-to-tr text-14 2xl:text-base inline-block to-[#B6F09C] text-transparent bg-clip-text">
                Forgot Password?
              </span>
            </div>

            <Button>
              {loading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </div>

        <h1 className="font-semibold text-nobbleBlack-400 text-14 2xl:text-base w-full overflow-hidden">
          Don’t have an account?
          <Link
            href={"/register"}
            className="from-[#82DBF7] bg-gradient-to-tr inline-block to-[#B6F09C] text-transparent bg-clip-text ml-1"
          >
            Sign Up
          </Link>
        </h1>
      </div>

      <div className="flex-1 relative hidden xl:flex">
        <Image
          src="/static_images/abstract-01.png"
          alt="Login Abstract"
          className="rounded-l-24"
          quality={100}
          fill
        />
      </div>
    </div>
  );
};

export default LogIn;
