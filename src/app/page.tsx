"use client"

import Image from "next/image";
import { ReactNode, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { FirstForm, SecondForm, ThirdForm, FourthForm } from "./Forms";
import { FourthFormInput, RenderFormType } from "./types/common";
import { fieldsList } from "./constants";
import { filterOutEntry } from "./utils";

const renderFormFunc = ({ page, setPage, submitted, setSubmitted, entries, setEntries }: RenderFormType) => {
  switch (page) {
    case 2:
      return SecondForm(page, setPage)
    case 3:
      return ThirdForm(page, setPage)
    case 4:
      return FourthForm({ page, setPage, submitted, setSubmitted, entries, setEntries })
    default:
      return FirstForm(page, setPage)
  }
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

const deleteEntry = async (entryId: string) => {
  await fetch(`http://localhost:3001/api/delete/${entryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const removeEntry = async (entryId: string) => {
  try {
    await deleteEntry(entryId)
  } catch (err) {
    console.log('removeEntry -> err:', err);
  }
}

const firstRowBorderTop = (indx: number) => indx === 0 ? 'border-t' : ''
const lastRowBorderBottom = (indx: number, list: { [key: string]: string }) => indx === Object.keys(list).length - 1 ? 'border-b' : ''

const renderEntriesList = (entriesList: { [key: string]: string }[], setEntries: (value: { [key: string]: string }[]) => void): ReactNode => entriesList.map((entry) => (
  <div key={uuidv4()} className="entry">
    <div className="divide-y divide-teal-600">
      {
        Object.keys(fieldsList).map((fieldKey, indx) => (
          <div key={uuidv4()} className="flex divide-teal-600">
            <div className={`flex mx-0 py-2 px-2 w-full border-l border-teal-600 ${firstRowBorderTop(indx)} ${lastRowBorderBottom(indx, fieldsList)}`}>
              {fieldsList[fieldKey]}:
            </div>
            <div className={`flex-no-shrink py-2 px-2 border-x border-teal-600 ${firstRowBorderTop(indx)} ${lastRowBorderBottom(indx, fieldsList)}`}>
              {entry[fieldKey]}
            </div>
          </div>
        )
        )
      }
    </div>
    <button onClick={() => {
      setEntries(filterOutEntry(entriesList, entry._id))
      removeEntry(entry._id)
    }} className="remove-btn border-teal-600">Remove this entry</button>
  </div>
))

export default function Home() {
  const [page, setPage] = useState<number>(1)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [entries, setEntries] = useState<{ [key: string]: string }[]>([])

  const showAllEntries = async () => {
    try {
      const entriesList: { [key: string]: string }[] = await getAll()
      setEntries(entriesList)
    } catch (err) {
      console.log('showAllEntries -> err:', err);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by filling out&nbsp;
          <code className="font-mono font-bold">the form</code>
          &nbsp;below.
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
      {renderFormFunc({ page, setPage, submitted, setSubmitted, entries, setEntries })}
      <button className="my-0 mx-0 w-[400px] border-teal-600" onClick={() => showAllEntries()}>Show all entries</button>
      {
        entries.length > 0 && (
          <div className="entries">
            {renderEntriesList(entries, setEntries)}
          </div>
        )
      }
    </main>
  );
}
