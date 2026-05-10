import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Salalah RV Park | سالالة RV بارك</title>
        <meta name="description" content="Luxury RV Camping in Salalah Khareef Season - تخييم فاخر في موسم صلالة الخريفي" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Salalah RV Park, صلالة, تخييم, كارافان, خريف صلالة, Khareef" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Cairo:wght@600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
