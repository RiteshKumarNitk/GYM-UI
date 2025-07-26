import PageMeta from "../../component/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../component/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="GYM DASHBOARD"
        description="GYM DASHBOARD SIGN IN "
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
