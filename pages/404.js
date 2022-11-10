import Head from 'next/head'
import React, {useEffect} from 'react'
import styles from "../styles/404.module.css"

const NotFound = (props) => {
    useEffect(() => {
        props.setProgress(100)
    }, [])
    
    return (
        <div className={styles.outerCont}>
            <Head>
                <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
                <title>404 Page not found | Dailypost</title>
            </Head>
            <div className={styles.container}>
                <img src='/bg404-edited.jpg'></img>
                <div className={styles.innerCont}>
                    <h2>404</h2>
                    <h4>OOPS! PAGE NOT FOUND</h4>
                    <p>Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable</p>
                    <a>Back to Home</a>
                </div>
            </div>
        </div>
    )
}

export default NotFound