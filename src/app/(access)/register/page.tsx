import Image from "next/image"
import RegisterForm from "./registerForm"
import bg from "../../../../public/images/bg-register.jpeg"

export default function Register() {
    return (
        <section className="">
            <div className="relative h-60 md:h-[600px] lg:h-[800px] w-auto">
                <Image
                    src={bg}
                    alt="login background"
                    fill
                    className="object-cover"
                />
            </div>
            <RegisterForm />
        </section>
    )
}
