import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UpdateUserRequest, useMeQueryLazyQuery, useUpdateUserMutation } from 'graphql/generated';
import UpdateUserFormComponent from 'components/UpdateUserForm';
import { toast } from 'react-toastify';

export default function HomeView() {
  const router = useRouter();

  const [loadUser, { data }] = useMeQueryLazyQuery()
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    loadUser()
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    router.push("/login");
  }

  const onUpdate = async (request: UpdateUserRequest) => {
    const { errors } = await updateUser({
      variables: {
        input: request
      }
    })

    if (errors) {
      toast.error(errors[0].message);
    } else {
      toast.success('Usuário atualizado com sucesso');
      loadUser()
    }
  }

  const renderHeader = () => {
    return (
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Hello
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              {data?.me?.firstName} {data?.me?.lastName}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              {data?.me?.email}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              {data?.me?.birthdate}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="ml-3">
            <button className="inline-flex items-center  btn btn-ghost" onClick={() => logout()}>Logout</button>
          </span>
        </div>
      </div>
    )
  }


  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full space-y-8">
          {data ?
            <>
              {renderHeader()}
              <UpdateUserFormComponent onSave={onUpdate} user={data.me} />
            </> :
            <progress className="progress w-56"></progress>}
        </div>
      </div>
    </>

  )
}