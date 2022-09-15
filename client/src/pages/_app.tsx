import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { useApollo } from 'graphql/apollo-client';


function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return <>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
      rel="stylesheet"
    />
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </ApolloProvider>
  </>
}

export default MyApp
