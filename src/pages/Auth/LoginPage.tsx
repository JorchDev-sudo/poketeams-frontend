import { Link } from "react-router-dom"
import { LoginForm } from "@/pages/Auth/components/AuthForm/AuthForm"
import AuthLayout from "@/pages/Auth/components/AuthLayout/AuthLayout"

export const LoginPage = () => {
    return (
        <AuthLayout
            eyebrow="Trainer login"
            title="Welcome back"
            description="Log in to manage your team."
            footer={
                <>
                    New trainer?{" "}
                    <Link to="/register" className="font-medium text-primary hover:underline">
                        Create an account
                    </Link>
                </>
            }
        >
            <LoginForm />
        </AuthLayout>
    );
}
