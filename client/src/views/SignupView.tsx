import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SignUpRequest, useSignUpMutation } from "graphql/generated";
import UserFormComponent from "components/UserForm";

export default function SignupView() {
  const [signUp] = useSignUpMutation();

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  const signup = async (request: SignUpRequest) => {
    const { errors } = await signUp({
      variables: {
        input: request
      }
    })
    if (errors) {
      toast.error(errors[0].message);
    } else {
      toast.success('Usuário criado com sucesso');
      router.push("/login");
    }
  }

  const renderHeader = () => {
    return (
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Criar conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <a href={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
            voltar para o login
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {renderHeader()}
        <UserFormComponent onSave={signup} />
      </div>
    </div>
  )
}