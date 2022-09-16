import { MeQueryQuery, UpdateUserRequest } from "graphql/generated";
import { useEffect, useState } from "react";

export default function UpdateUserFormComponent(props: UpdateUserFormComponent) {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');

  useEffect(() => {
    if (props.user) {
      setEmail(props.user.email)
      setFirstName(props.user.firstName)
      setLastName(props.user.lastName)

      const birthdate = new Date(props.user.birthdate)
      const day = ("0" + birthdate.getDate()).slice(-2);
      const month = ("0" + (birthdate.getMonth() + 1)).slice(-2);
      const today = birthdate.getFullYear() + "-" + (month) + "-" + (day);
      setBirthdate(today)
    }
  }, [props.user])


  const onSubmit = () => {
    props.onSave({
      birthdate,
      email,
      firstName,
      lastName,
    })
  }

  const renderEmailInput = () => {
    return (
      <div className="-space-y-px rounded-md shadow-sm">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Digite o seu e-mail</span>
          </label>
          <input type="email" value={email} placeholder="E-mail" className="input relative block w-full input-bordered input-primary" onChange={(e) => setEmail(e.target.value)} />
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
          <input type="text" placeholder="Primeiro nome" value={firstName} className="input relative block w-full input-bordered input-primary" onChange={(e) => setFirstName(e.target.value)} />
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
          <input type="text" placeholder="Último nome" value={lastName} className="input relative block w-full input-bordered input-primary" onChange={(e) => setLastName(e.target.value)} />
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
          <input type="date" placeholder="Data de nascimento" value={birthdate} className="input relative block w-full input-bordered input-primary" onChange={(e) => setBirthdate(e.target.value)} />
        </div>
      </div>
    )
  }

  const renderSubmitButton = () => {
    return (<div>
      <button className="group relative flex justify-center btn w-full btn-primary" onClick={onSubmit}>Atualizar</button>
    </div>)
  }


  return (
    <div className="w-full max-w-md space-y-8">
      {renderFirstName()}
      {renderLastName()}
      {renderBirthdate()}
      {renderEmailInput()}
      {renderSubmitButton()}
    </div>
  )
}

export interface UpdateUserFormComponent {
  user: MeQueryQuery['me']
  onSave(request: UpdateUserRequest): void
}
