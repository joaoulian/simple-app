import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLoginMutation } from "graphql/generated";

export default function LoginView() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const [login, { data }] = useLoginMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (data?.login?.accessToken) {
      localStorage.setItem('token', data.login.accessToken);
      router.replace("/");
    }
  }, [data])

  const submitToken = () => {
    login({
      variables: {
        input: {
          email,
          password
        }
      }
    })

  }

  const renderHeader = () => {
    return (
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Acesse sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ou{' '}
          <a href={'/sign-up'} className="font-medium text-indigo-600 hover:text-indigo-500">
            crie uma nova conta
          </a>
        </p>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <div className="-space-y-px rounded-md shadow-sm">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">E-mail</span>
          </label>
          <input type="text" placeholder="email@domain.com" value={email} className="input relative block w-full input-bordered input-primary" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Senha</span>
          </label>
          <input type="password" placeholder="password" className="input relative block w-full input-bordered input-primary" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
    )
  }


  const renderSubmitButton = () => {
    return (<div>
      <button className="group relative flex justify-center btn w-full btn-primary" onClick={submitToken}>Entrar</button>
    </div>)
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {renderHeader()}
        {renderForm()}
        {renderSubmitButton()}
      </div>
    </div>
  )
}