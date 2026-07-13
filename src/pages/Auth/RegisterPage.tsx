import { Link } from "react-router-dom"
import { RegisterForm } from "@/pages/Auth/components/AuthForm/AuthForm"
import AuthLayout from "@/pages/Auth/components/AuthLayout/AuthLayout"

export const RegisterPage = () => {
    return (
        <AuthLayout
            eyebrow="New trainer registration"
            title="Create your trainer profile"
            description="Set up your account to start building teams."
            footer={
                <>
                    Already registered?{" "}
                    <Link to="/login" className="font-medium text-primary hover:underline">
                        Log in
                    </Link>
                </>
            }
        >
            <RegisterForm />
        </AuthLayout>
    );
}
