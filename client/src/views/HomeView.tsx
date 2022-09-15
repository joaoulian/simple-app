import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMeQueryLazyQuery } from 'graphql/generated';

export default function HomeView() {
  const router = useRouter();

  const [loadUser, { data }] = useMeQueryLazyQuery()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    loadUser()
  }, []);

  console.log(data);

  const logout = () => {
    localStorage.removeItem('token');
    router.push("/login");
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
              Batata
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
          {renderHeader()}
        </div>
      </div>
    </>

  )
}