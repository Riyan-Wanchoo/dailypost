import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import '../styles/globals.css'
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const notify = (message, type) => {
    toast[type](message)
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Dailypost-Share awareness, Gain Awareness" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Roboto+Serif:wght@600&family=Roboto:wght@300&family=Open+Sans:ital@1&family=Open+Sans&family=Updock&family=Tangerine:wght@700&display=swap"
          rel="stylesheet" />
        <link rel="shortcut icon" href="/dailypost-logo.png" type="image/x-icon" />
      </Head>


      {/* <Navbar /> */}
      <LoadingBar
        color='#0016f5'
        progress={progress}
        waitingTime={700}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <Component {...pageProps} setProgress={setProgress} notify={notify}/>
      {router.pathname == "/404" ? <Footer marginTop="0px" /> : <Footer marginTop="80px" />}
    </>
  )
}

export default MyApp
