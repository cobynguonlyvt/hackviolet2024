import { LoginForm } from "@/components/login-form";

export default async function SignInRoute() {

    //const handleLogin = async (email: string, password: string) => {
    //    console.log(email);
    //    console.log(password);

    //    const response = await fetch('http://127.0.0.1:8000/login', {
    //        method: "POST",
    //        headers: {
    //            "Content-Type": "application/json",
    //        },
    //        body: JSON.stringify({ email, password }),
    //    });

    //    const data = await response.json();
    //    console.log(data);
    //};

    return <LoginForm />
}
