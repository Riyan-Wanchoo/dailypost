import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
import { Facebook, Twitter, Instagram } from 'react-bootstrap-icons';

const Footer = (props) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>
      {/* <div className={styles.copyright}>
            <p>Dailypost Copyright © 2022 | All Rights Reserved</p>
        </div> */}
      <footer className={styles.footer} style={{marginTop: props.marginTop}}>
        <div className={styles.footerContainer}>
          <div className={styles.rowJustify}>
            <div className={styles.col12}>
              <h2 className={styles.footerHeading}>
                <a href="#" className={styles.footerLogo}>Dailypost</a>
              </h2>
              <p className={styles.menu}>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">FAQ&apos;s</a>
                <a href="#">Contact Us</a>
              </p>
              <ul className={styles.ftco}>
                <li className={styles.ftcoAnimate}>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
                    {/* <i className="fa-brands fa-twitter"></i> */}
                    <Twitter size={23}/>
                  </a>
                </li>
                <li className={styles.ftcoAnimate}>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook">
                    {/* <i className="fa-brands fa-facebook"></i> */}
                    <Facebook size={23}/>
                  </a>
                </li>
                <li className={styles.ftcoAnimate}>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Instagram">
                    {/* <i className="fa-brands fa-instagram"></i> */}
                    <Instagram size={23}/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.rowmt}>
            <div className={styles.col12text}>
              <p className={styles.copyright}>Copyright © 2022 | All Rights Reserved </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer