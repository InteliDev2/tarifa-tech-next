"use client"

import { useForm } from "react-hook-form";

type SecondFormInput = {
  emploee: string,
  role: string,
  age: number,
};

// TODO: should be reused with general Form component later on
export function SecondForm(page: number, setPage: (value: number) => void) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SecondFormInput>();

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
      <progress value={2} max={5} />
      <div className="flex flex-col py-4">
        <h2 className={`mb-3 text-2xl font-semibold`}>Company Team</h2>
        <form key="2" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex">
            <label className="flex w-full">Emploee</label>
            <input {...register('emploee', { required: true })} className="rounded w-full text-sm mb-3" />
          </div>
          {errors.emploee && <span>This field is required</span>}
          <div className="flex">
            <label className="flex w-full">Role</label>
            <input {...register('role', { required: true })} className="rounded w-full text-sm mb-3" />
          </div>
          {errors.role && <span>This field is required</span>}
          <div className="flex">
            <label className="flex w-full">Age</label>
            <input type="number" {...register('age')} className="rounded w-full text-sm mb-3" />
          </div>
          <div className="flex">
            {page > 1 && <button onClick={() => handleClickBack()}>Back</button>}
            {page < 3 && <input type="submit" value="Next" className="rounded w-full text-sm mb-3" />}
          </div>
        </form>
      </div>
    </>
  );
}
