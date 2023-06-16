"use client"

import { useForm } from "react-hook-form";
import { FourthFormInput, RenderFormType } from "../types/common";
import { v4 as uuidv4 } from 'uuid';
import { fieldsList } from "../constants";

// TODO: should be reused with general Form component later on
export function FourthForm({ page, setPage, submitted, setSubmitted, entries, setEntries }: RenderFormType) {
  const { handleSubmit, watch, reset } = useForm<FourthFormInput>()

  const goBackToTheFirstForm = () => {
    reset()
    setPage(1)
    setSubmitted(false)
  }

  const handleClickBack = () => {
    setPage(page - 1)
  }

  const postAll = async (data: FourthFormInput) => {
    const response = await fetch('http://localhost:3001/api/post', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json();
  }

  const onSubmit = async (data: any) => {
    try {
      await postAll(data)

      if (entries.length > 0) {
        setEntries(entries.concat([data]))
      }

      setSubmitted(true)
    } catch (err) {
      console.log('onSubmit -> err:', err);
    }
  }

  const renderList = (): JSX.Element[] => Object.keys(fieldsList).map((fieldKey) => (
    <div key={uuidv4()} className="flex">
      <label className="flex w-full">{fieldsList[fieldKey]}:</label>
      <div className="flex-no-shrink">{watch(fieldKey as "companyName" | "address" | "phone" | "emploee" | "role" | "age" | "department" | "manager")}</div>
    </div>
  ))

  return (
    <>
      <progress value={submitted ? 5 : 4} max={5} />
      <div className="flex flex-col py-4">
        <h2 className={`mb-3 text-2xl font-semibold`}>Review and Submit</h2>
        {
          submitted ?
            <div>
              <h2 className={`mb-3 text-2xl font-semibold`}>Your data has been sent!</h2>
              <button onClick={() => goBackToTheFirstForm()}>Go Back to the First Form</button>
            </div>
            :
            <form key="4" onSubmit={handleSubmit(onSubmit)}>
              {renderList()}
              <div className="flex">
                {page > 1 && <button onClick={() => handleClickBack()}>Back</button>}
                {page < 5 && <input type="submit" value="Submit" className="rounded w-full text-sm mb-3" />}
              </div>
            </form>
        }
      </div >
    </>
  );
}
