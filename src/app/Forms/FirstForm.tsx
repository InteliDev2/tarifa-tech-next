"use client"

import { useForm } from "react-hook-form";

type FirstFormInputs = {
  companyName: string,
  address: string,
  phone: number,
};

// TODO: should be reused with general Form component later on
export function FirstForm(page: number, setPage: (value: number) => void) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FirstFormInputs>();

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
      <h2 className={`mb-3 text-2xl font-semibold`}>Basic Company Information</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-line">
          <label>Company Name</label>
          <input {...register('companyName', { required: true })} />
        </div>
        {errors.companyName && <span>This field is required</span>}
        <div className="form-line">
          <label>Address</label>
          <input {...register("address", { required: true })} />
        </div>
        {errors.address && <span>This field is required</span>}
        <div className="form-line">
          <label>Phone</label>
          <input type="number" {...register("phone", { pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, required: true })} />
        </div>
        {errors.phone && <span>This field is required</span>}
        <div className="form-line">
          {page < 3 && <input type="submit" value="Next" />}
        </div>
      </form>
    </>
  );
}