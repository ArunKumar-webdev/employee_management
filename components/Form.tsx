"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface findDataType {
  id: number;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
  profile_image: string;
}

interface FormData {
  isLoading?: boolean;
  isError?: string;
  type?: string;
  findData?: findDataType;
  createEmployee?: (data: any) => Promise<void>;
  updateEmployee?: (id: number, data: any) => Promise<void>;
}

const Form = ({ isError, type, createEmployee, findData, updateEmployee, isLoading }: FormData) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ defaultValues: { id: findData?.id, employee_name: findData?.employee_name, employee_salary: findData?.employee_salary, employee_age: findData?.employee_age, profile_image: findData?.profile_image } });

  const [proPicUrl, setproPicUrl] = useState(findData?.profile_image ? findData?.profile_image : '');
  const router = useRouter();
  const onSubmit = (data) => {
    createEmployee(data);
    reset();
    router.push("/");
  };

  const onEdit = (data) => {
    updateEmployee(findData.id, data);
    reset();
    router.push("/");
  };

  return (
    <>
      <form
        onSubmit={type === 'Add' ? handleSubmit(onSubmit) : handleSubmit(onEdit)}
        className="mx-[20rem] ss:mx-[10rem] my-7 shadow-lg"
      >
        <div className="mb-9 font-semibold">{`${type} Employee Information :`}</div>
        <div className="">
          <div className="flex flex-col gap-10 mx-6 ">
            {/* Name*/}
            <div className="w-full">
              <h3 className="text-lg font-semibold">Name<span className="text-red-600">*</span></h3>
              <div className="flex flex-col gap-2 border-[1.5px] p-2 rounded-lg border-black py-4 w-full">
                <input type="text"
                  placeholder="Employee Name"
                  {...register("employee_name", {
                    required: "Employee name is required",
                    pattern: {
                      value: /^(?=.{1,33}$)[a-zA-Z0-9]*[^$%^&*;:,<>?()\"']*$/,
                      message: "Please enter a valid name",
                    },
                  })}
                  id="employee_name"
                  name="employee_name"
                  className="focus:border-none focus:outline-none "
                />
              </div>
              {errors.employee_name && (
                <span className="text-[14px] text-red-400">
                  {`${errors.employee_name?.message}`}
                </span>
              )}
            </div>
            <div className="flex flex-wrap">
              {/* Salary*/}
              <div className="w-1/4">
                <h3 className="text-lg font-semibold">Salary<span className="text-red-600">*</span></h3>
                <div className="flex justify-between items-center gap-2 border-[1.5px] p-2 rounded-lg border-black py-4 w-full">
                  <input
                    type="number"
                    id="salary"
                    placeholder="Employee Salary"
                    {...register("employee_salary", {
                      required: "Employee salary is required",
                      pattern: {
                        value: /^\d+(\.\d+)?/,
                        message: "Please enter a valid amount",
                      },
                    })}
                    name="employee_salary"
                    className="focus:border-none focus:outline-none "
                  />
                </div>
                {errors.employee_salary && (
                  <span className="text-[14px] text-red-400">
                    {`${errors.employee_salary?.message}`}
                  </span>
                )}
              </div>
              {/* Age*/}
              <div className="w-1/4 mx-5">
                <h3 className="text-lg font-semibold">Age<span className="text-red-600">*</span></h3>
                <div className="flex justify-between items-center gap-2 border-[1.5px] p-2 rounded-lg border-black py-4">
                  <input
                    type="number"
                    id="agreementdate"
                    placeholder="Employee Age"
                    {...register("employee_age", {
                      required: "Employee age is required",
                      pattern: {
                        value: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
                        message: "Please enter a valid date",
                      },
                    })}
                    name="employee_age"
                    className="focus:border-none focus:outline-none "
                  />
                </div>
                {errors.employee_age && (
                  <span className="text-[14px] text-red-400">
                    {`${errors.employee_age?.message}`}
                  </span>
                )}
              </div>
            </div>

            {/* Profile*/}
            <div className="w-full">
              <h3 className="text-lg font-semibold">Profile Image<span className="text-red-600">*</span></h3>
              <div className="flex flex-col gap-2 border-[1.5px] p-2 rounded-lg border-black py-4 w-full">
                <input
                  type="text"
                  placeholder="Employee profile image as url"
                  {...register("profile_image", {
                    required: "Profile image is required"
                  })}
                  id="profile_image"
                  name="profile_image"
                  className="focus:border-none focus:outline-none "
                  onChange={(e) => { setproPicUrl(e.target.value) }}
                />
              </div>
              {errors.profile_image && (
                <span className="text-[14px] text-red-400">
                  {`${errors.profile_image?.message}`}
                </span>
              )}
            </div>
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-2">{'Profile Image Preview'}</h3>
              <img className="w-32 h-32" src={proPicUrl == "" ? '/assets/icons/avatar.png' : proPicUrl} alt="" />
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-12 pb-6">
            <button
              disabled={isSubmitting}
              data-testid="Add"
              type="submit"
              className="bg-[#1976d2] text-white font-semibold py-2 px-8 rounded-lg"
            > {'Add'} </button>
            <Link href={"/"}>
              <button className="bg-[#539feb] text-white font-semibold py-2 px-8 rounded-lg">{'Cancel'}</button>
            </Link>
          </div>
        </div>

      </form>
    </>
  );
};

export default Form;
