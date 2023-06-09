"use client"

import { useForm } from "react-hook-form";

type SecondFormInputs = {
  emploee: string,
  role: string,
  age: number,
};

// TODO: should be reused with general Form component later on
export function SecondForm(page: number, setPage: (value: number) => void) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SecondFormInputs>();

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

  console.log('SecondForm:', watch("emploee"), watch("role"), watch("age"))

  return (
    <>
      <h2 className={`mb-3 text-2xl font-semibold`}>Company Team</h2>
      <form key="2" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-line">
          <label>Emploee</label>
          <input {...register('emploee', { required: true })} />
        </div>
        {errors.emploee && <span>This field is required</span>}
        <div className="form-line">
          <label>Role</label>
          <input {...register('role', { required: true })} />
        </div>
        {errors.role && <span>This field is required</span>}
        <div className="form-line">
          <label>Age</label>
          <input type="number" {...register('age')} />
        </div>
        <div className="form-line">
          {page > 1 && <button onClick={() => handleClickBack()}>Back</button>}
          {page < 3 && <input type="submit" value="Next" />}
        </div>
      </form>
    </>
  );
}