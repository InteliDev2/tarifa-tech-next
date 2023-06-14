export type FourthFormInput = {
    companyName: string,
    address: string,
    phone: number,
    emploee: string,
    role: string,
    age: number,
    department: string,
    manager: string,
};

export type RenderFormType = {
    page: number,
    setPage: (value: number) => void,
    submitted: boolean,
    setSubmitted: (value: boolean) => void,
}
