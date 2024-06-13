import Image from "next/image"
import LoginForm from "./loginForm"
import bg from "../../../../public/images/bg-login.jpeg"

export default function Login() {
    return (
        <section>
            <div>
                <Image src={bg} alt="login background" priority={true} />
            </div>
            <LoginForm />
        </section>
    )
}
