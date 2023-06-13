"use client"

import { useForm } from "react-hook-form";
import { FourthFormInput, RenderFormType } from "../types/common";
import { ReactNode } from "react";

// TODO: should be reused with general Form component later on
export function FourthForm({ page, setPage, submitted, setSubmitted, entries, setEntries }: RenderFormType) {
  const { handleSubmit, watch, reset } = useForm<FourthFormInput>()

  const goBackToTheFirstForm = () => {
    reset()
    setPage(1)
  }

  const handleClickBack = () => {
    setPage(page - 1)
  }

  const getAll = async () => {
    const response = await fetch('http://localhost:3001/api/getAll', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.json();
  }

  const showAllEntries = async () => {
    try {
      const entriesList: FourthFormInput[] = await getAll()
      setEntries(entriesList)
    } catch (err) {
      console.log('onSubmit -> err:', err);
    }
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
      const res = await postAll(data)
      setSubmitted(true)
    } catch (err) {
      console.log('onSubmit -> err:', err);
    }
  }

  const renderList = (fields: string[], keys: readonly ("address" | "companyName" | "phone" | "emploee" | "role" | "age" | "department" | "manager")[]): ReactNode => fields.map((_, index) => (
    <div className="form-line">
      <label>{fields[index]}:</label>
      <div className="flex-no-shrink">{watch(keys[index])}</div>
    </div>
  ))

  const fieldsList: string[] = ['Company Name', 'Address', 'Phone', 'Emploee', 'Role', 'Age', 'Department', 'Manager']
  const keysList: readonly ("address" | "companyName" | "phone" | "emploee" | "role" | "age" | "department" | "manager")[] =
    ['companyName', 'address', 'phone', 'emploee', 'role', 'age', 'department', 'manager']

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
              <button onClick={() => showAllEntries()}>Show all entries</button>
              {/*TODO: reuse renderList properly {
                entries.length > 0 && (
                  <div className="review">
                    {renderList(fieldsList, keysList)}
                  </div>
                )
              } */}
            </div>
            :
            <form key="4" onSubmit={handleSubmit(onSubmit)}>
              {renderList(fieldsList, keysList)}
              <div className="form-line">
                {page > 1 && <button onClick={() => handleClickBack()}>Back</button>}
                {page < 5 && <input type="submit" value="Submit" />}
              </div>
            </form>
        }
      </div >
    </>
  );
}
