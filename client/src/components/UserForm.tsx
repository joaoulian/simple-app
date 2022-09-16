import { SignUpRequest } from "graphql/generated";
import { useState } from "react";

export default function UserFormComponent(props: UserFormComponentProps) {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = () => {
    props.onSave({
      birthdate,
      email,
      firstName,
      lastName,
      password
    })
  }

  const renderEmailInput = () => {
    return (
      <div className="-space-y-px rounded-md shadow-sm">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Digite o seu e-mail</span>
          </label>
          <input type="email" placeholder="E-mail" className="input relative block w-full input-bordered input-primary" onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
    )
  }

  const renderFirstName = () => {
    return (
      <div className="-space-y-px rounded-md shadow-sm">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Digite o seu primeiro nome</span>
          </label>
          <input type="text" placeholder="Primeiro nome" className="input relative block w-full input-bordered input-primary" onChange={(e) => setFirstName(e.target.value)} />
        </div>
      </div>
    )
  }

  const renderLastName = () => {
    return (
      <div className="-space-y-px rounded-md shadow-sm">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Digite o seu sobrenome </span>
          </label>
          <input type="text" placeholder="Último nome" className="input relative block w-full input-bordered input-primary" onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>
    )
  }

  const renderBirthdate = () => {
    return (
      <div className="-space-y-px rounded-md shadow-sm">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Digite a data de nascimento</span>
          </label>
          <input type="date" placeholder="Data de nascimento" className="input relative block w-full input-bordered input-primary" onChange={(e) => setBirthdate(e.target.value)} />
        </div>
      </div>
    )
  }


  const renderPassword = () => {
    return (
      <div className="-space-y-px rounded-md shadow-sm">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Digite a senha</span>
          </label>
          <input type="password" placeholder="Último nome" className="input relative block w-full input-bordered input-primary" onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
    )
  }

  const renderSubmitButton = () => {
    return (<div>
      <button className="group relative flex justify-center btn w-full btn-primary" onClick={onSubmit}>Criar</button>
    </div>)
  }


  return (
    <div className="w-full max-w-md space-y-8">
      {renderFirstName()}
      {renderLastName()}
      {renderBirthdate()}
      {renderEmailInput()}
      {renderPassword()}
      {renderSubmitButton()}
    </div>
  )
}

export interface UserFormComponentProps {
  onSave(request: SignUpRequest): void
}
