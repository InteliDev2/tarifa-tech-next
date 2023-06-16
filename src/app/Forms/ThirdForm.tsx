"use client"

import { useForm } from "react-hook-form";

type ThirdFormInput = {
  department: string,
  manager: string,
};

// TODO: should be reused with general Form component later on
export function ThirdForm(page: number, setPage: (value: number) => void) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ThirdFormInput>();

  const handleClickNext = () => {
    setPage(page + 1)
  }

  const handleClickBack = () => {
    setPage(page - 1)
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
      <progress value={3} max={5} />
      <div className="flex flex-col py-4">
        <h2 className={`mb-3 text-2xl font-semibold`}>Company Departments</h2>
        <form key="3" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex">
            <label className="flex w-full">Department</label>
            <input {...register('department', { required: true })} className="rounded w-full text-sm mb-3" />
          </div>
          {errors.department && <span>This field is required</span>}
          <div className="flex">
            <label className="flex w-full">Manager</label>
            <input {...register('manager', { required: true })} className="rounded w-full text-sm mb-3" />
          </div>
          {errors.manager && <span>This field is required</span>}
          <div className="flex">
            {page > 1 && <button onClick={() => handleClickBack()}>Back</button>}
            {page < 4 && <input type="submit" value="Next" className="rounded w-full text-sm mb-3" />}
          </div>
        </form>
      </div>
    </>
  );
}
