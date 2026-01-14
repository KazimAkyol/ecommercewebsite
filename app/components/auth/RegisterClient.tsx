"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa"
import AuthContainer from "../containers/AuthContainer"
import Heading from "../general/Heading"
import Input from "../general/Input"
import Button from "../general/Button"
import Link from "next/link"
import { InputProps } from "@mui/material"

const RegisterClient = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }

    return (
        <AuthContainer>
            <div className="w-full md:w-125 p-3 shadow-lg rounded-md">
                <Heading text="Register" center />
                <Input placeholder="Name" type="text" id="name" register={register} errors={errors} required />
                <Input placeholder="Surname" type="text" id="surname" register={register} errors={errors} required />
                <Input placeholder="Email" type="text" id="email" register={register} errors={errors} required />
                <Input placeholder="Password" type="password" id="password" register={register} errors={errors} required />
                <Button text="Sign Up" onClick={handleSubmit(onSubmit)}></Button>
                <div className="text-center my-2 text-sm text-red-500">Have an account? <Link className="underline " href="/login">Click here</Link></div>
                <div className="text-center my-2 font-bold text-lg">OR</div>
                <Button text="Sign Up with Google" icon={FaGoogle} outline onClick={() => { }}></Button>
            </div>
        </AuthContainer>
    )
}

export default RegisterClient