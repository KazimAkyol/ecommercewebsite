"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa"
import AuthContainer from "../containers/AuthContainer"
import Heading from "../general/Heading"
import Input from "../general/Input"
import Button from "../general/Button"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const RegisterClient = () => {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post("/api/register", data).then(() => {
            toast.success("Registered!")
            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback) => {
                if (callback?.ok) {
                    router.push("/cart")
                    router.refresh();
                    toast.success("Logged in!")
                }

                if (callback?.error) {
                    toast.error(callback.error)
                }
            })
        })
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