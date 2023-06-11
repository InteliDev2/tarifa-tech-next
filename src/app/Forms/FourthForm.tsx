"use client"

import { useForm } from "react-hook-form";
import { RenderFormType } from "../types/common";

type FourthFormInput = {
  companyName: string,
  address: string,
  phone: number,
  emploee: string,
  role: string,
  age: number,
  department: string,
  manager: string,
};

// TODO: should be reused with general Form component later on
export function FourthForm({ page, setPage, submitted, setSubmitted }: RenderFormType) {
  const { handleSubmit, watch, reset } = useForm<FourthFormInput>()

  const goBackToTheFirstForm = () => {
    reset()
    setPage(1)
  }

  const handleClickBack = () => {
    setPage(page - 1)
  }

  const onSubmit = (data: any) => {
    console.log('onSubmit -> data:', data);
    setSubmitted(true)
  }

  console.log(watch("companyName"), watch("address"), watch("phone"), watch("emploee"), watch("role"), watch("age"), watch("department"), watch("manager"), '---submitted:', submitted)

  return (
    <>
      <progress value={submitted ? 5 : 4} max={5} />
      <div>
        <h2 className={`mb-3 text-2xl font-semibold`}>Review and Submit</h2>
        {
          submitted ?
            <div>
              <h2 className={`mb-3 text-2xl font-semibold`}>Your data has been sent!</h2>
              <button onClick={() => goBackToTheFirstForm()}>Go Back to the First Form</button>
            </div>
            :
            <form key="3" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-line">
                <label>Company Name:</label>
                <div className="flex-no-shrink">{watch("companyName")}</div>
              </div>
              <div className="form-line">
                <label>Address:</label>
                <div className="flex-no-shrink">{watch("address")}</div>
              </div>
              <div className="form-line">
                <label>Phone:</label>
                <div className="flex-no-shrink">{watch("phone")}</div>
              </div>
              <div className="form-line">
                <label>Emploee:</label>
                <div className="flex-no-shrink">{watch("emploee")}</div>
              </div>
              <div className="form-line">
                <label>Role:</label>
                <div className="flex-no-shrink">{watch("role")}</div>
              </div>
              <div className="form-line">
                <label>Age:</label>
                <div className="flex-no-shrink">{watch("age")}</div>
              </div>
              <div className="form-line">
                <label>Department:</label>
                <div className="flex-no-shrink">{watch("department")}</div>
              </div>
              <div className="form-line">
                <label>Manager:</label>
                <div className="flex-no-shrink">{watch("manager")}</div>
              </div>
              <div className="form-line">
                {page > 1 && <button onClick={() => handleClickBack()}>Back</button>}
                {page < 5 && <input type="submit" value="Submit" />}
              </div>
            </form>
        }
      </div>
    </>
  );
}
