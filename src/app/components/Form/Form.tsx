"use client"

import { BaseSyntheticEvent } from "react";
import { SubmitHandler, SubmitErrorHandler, FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

type FormParamsType = {
    register: UseFormRegister<any>,
    handleSubmit: (onValid: SubmitHandler<any>, onInvalid?: SubmitErrorHandler<any> | undefined) => (e?: BaseSyntheticEvent<any> | undefined) => Promise<any>,
    errors: FieldErrors<any>,
    title: string,
    labelsList: string[],
}

const transformValue = (value: string) => value.split(' ').join('').toLowerCase()

const onSubmit: SubmitHandler<any> = data => console.log(data);

export function Form({ title, labelsList }: FormParamsType) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <div key={uuidv4()}>
            <h2 className={`mb-3 text-2xl font-semibold`}>{title}</h2>
            <form key={uuidv4()} onSubmit={handleSubmit(onSubmit)}>
                {labelsList.map((value) => (
                    <div key={uuidv4()}>
                        <div className="flex">
                            <label>{value}</label>
                            <input {...register(transformValue(value), { required: true })} className="rounded w-full text-sm" />
                        </div>
                        {errors[transformValue(value)] && <span>This field is required</span>}
                    </div>
                )
                )}
                <p className="errors-notice">* error(s) check on submit only</p>
                <input type="submit" className="rounded w-full text-sm" />
            </form>
        </div>
    )
}