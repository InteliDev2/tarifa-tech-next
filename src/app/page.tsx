"use client"

import Image from "next/image";
import { ReactNode, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FirstFormInputs = {
  companyName: string,
  address: string,
  phone: number,
};

type SecondFormInputs = {
  emploee: string,
  role: string,
  age: number,
};

type ThirdFormInputs = {
  department: string,
  manager: string,
};

function FirstForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FirstFormInputs>();
  const onSubmit: SubmitHandler<FirstFormInputs> = data => console.log(data);

  console.log(watch("companyName"), watch("address"), watch("phone"), 'errors:', errors) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <h2 className={`mb-3 text-2xl font-semibold`}>Basic Company Information</h2>
      <form key="1" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
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
          <input type="number" {...register("phone", { pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im })} />
        </div>
        <p>* error(s) check on submit only</p>
        <input type="submit" />
      </form>
    </>
  );
}

function SecondForm() {
  const { register, handleSubmit, watch, formState: { errors} } = useForm<SecondFormInputs>();
  const onSubmit: SubmitHandler<SecondFormInputs> = data => console.log(data);

  console.log(watch("emploee"), watch("role"), watch("age")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <h2 className={`mb-3 text-2xl font-semibold`}>Company Team</h2>
      <form key="2" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
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
        <p>* error(s) check on submit only</p>
        <input type="submit" />
      </form>
    </>
  );
}

function ThirdForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ThirdFormInputs>();
  const onSubmit: SubmitHandler<ThirdFormInputs> = data => console.log(data);

  console.log(watch("department"), watch("manager")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <h2 className={`mb-3 text-2xl font-semibold`}>Company Departments</h2>
      <form key="3" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="form-line">
          <label>Department</label>
          <input {...register('department', { required: true })} />
        </div>
        {errors.department && <span>This field is required</span>}
        <div className="form-line">
          <label>Manager</label>
          <input {...register('manager', { required: true })} />
        </div>
        {errors.manager && <span>This field is required</span>}
        <p>* error(s) check on submit only</p>
        <input type="submit" />
      </form>
    </>
  );
}

export default function Home() {
  const [page, setPage] = useState(1)
  

  const handleClickNext = () => {
    setPage(page + 1)
  }

  const handleClickBack = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const Component = (page: number): ReactNode => {
    switch (page) {
      case 2:
        return SecondForm()
      case 3:
        return ThirdForm() 
      default:
        return FirstForm()
    }
  }

  console.log('page:', page)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the Next.js 13 playground.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
      {Component(page)}
      <div className="form-line">
        <button onClick={() => handleClickBack()}>Back</button>
        <button onClick={() => handleClickNext()}>Next</button>
      </div>
    </main>
  );
}
