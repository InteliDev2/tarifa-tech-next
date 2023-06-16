"use client"

import { useForm } from "react-hook-form";

type FirstFormInput = {
  companyName: string,
  address: string,
  phone: number,
};

// TODO: should be reused with general Form component later on
export function FirstForm(page: number, setPage: (value: number) => void) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FirstFormInput>();

  const handleClickNext = () => {
    setPage(page + 1)
  }

  const onSubmit = (data: any) => {
    console.log('onSubmit -> data:', data);
    handleClickNext()
  }

  const onError = (data: any) => {
    console.log('onError -> data:', data);
  }

  return (
    <>
      <progress value={1} max={5} />
      <div className="flex flex-col py-4">
        <h2 className={`mb-3 text-2xl font-semibold`}>Basic Company Information</h2>
        <form key="1" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex">
            <label className="flex w-full">Company Name</label>
            <input {...register('companyName', { required: true })} className="rounded w-full text-sm mb-3" />
          </div>
          {errors.companyName && <span>This field is required</span>}
          <div className="flex">
            <label className="flex w-full">Address</label>
            <input {...register("address", { required: true })} className="rounded w-full text-sm mb-3" />
          </div>
          {errors.address && <span>This field is required</span>}
          <div className="flex">
            <label className="flex w-full">Phone</label>
            <input type="number" {...register("phone", { pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, required: true })} className="rounded w-full text-sm mb-3" />
          </div>
          {errors.phone && <span>This field is required and it should have 10-12 digits</span>}
          <div className="flex">
            {page < 3 && <input type="submit" value="Next" className="rounded w-full text-sm mb-3" />}
          </div>
        </form>
      </div>
    </>
  );
}
