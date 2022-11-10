import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import Cookies from 'js-cookie'
import { MdAccountCircle } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import useLoaded from "../components/useLoaded"

const Navbar = () => {
    const [days, setDays] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    const [day, setDay] = useState()
    const [time, setTime] = useState()
    const [today, setToday] = useState()

    const handleburger = () => {
        //wait
        const head2 = document.querySelector('.head2')
        if (head2.style.display === "flex") {
            head2.style.display = "none"
        }
        else {
            head2.style.display = "flex"
        }
    }

    useEffect(() => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const newDate = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
        const newDate2 = new Date()
        const newDateArr = newDate.split(",")
        const hms = newDateArr[1].split(":")
        setDay(newDate2.getDay())
        setTime(hms[0] + ":" + hms[1] + " PM")
        var today
        var dd = String(newDate2.getDate())
        var mm = String(newDate2.getMonth())
        var yyyy = newDate2.getFullYear()
        setToday(dd + ' ' + months[mm] + ' ' + yyyy);
    }, [])

    const loaded = useLoaded();

    return (
        <nav className={styles.navbar}>
            <div className={styles.time}>
                <div className={styles.date}>
                    <span>{days[day]}, {today}</span>
                    <span className={styles.ISTtime}>{time} IST</span>
                    <span className={styles.newdelhi}>New Delhi</span>
                </div>
                <div className="dropdown" role="button">
                    <div className={styles.divP} id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false" style={{ margin: "0px" }}>
                        <div>

                            <img
                                className="secret"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/2560px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png"
                                alt=""
                                style={{ width: "15px", marginRight: "5px" }}
                            />
                        </div>
                        <span className="secretp">English</span>
                    </div>
                </div>
            </div>
            <div className={styles.head1}>
                <Link href="/" legacyBehavior><a><img src="/dailypost-logo.png" alt="Logo" /></a></Link>
                {/* <svg xmlns="http://www.w3.org/2000/svg" onClick={handleburger} width="36" height="36" fill="currentColor" className={`${styles.svg} ${styles.disabled}`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
                </svg> */}
                <GiHamburgerMenu size={36} onClick={handleburger} className={`${styles.svg} ${styles.disabled}`} />
                {Cookies.get("jwt") && loaded ? <Link href={"/logout"} legacyBehavior>
                    <FiLogOut size={25} className={styles.account} />
                </Link> : <Link href={"/login"} legacyBehavior>
                    <MdAccountCircle size={30} className={styles.account} />
                </Link>}
            </div>
            <div>
                <div className={`${styles.head2} head2`}>
                    <ul>
                        <li><Link href="/" legacyBehavior><a>Home</a></Link></li>
                        <li><Link href="/news/india" legacyBehavior><a>India</a></Link></li>
                        <li><Link href="/news/world" legacyBehavior><a>World</a></Link></li>
                        <li><Link href="/news/entertainment" legacyBehavior><a>Entertainment</a></Link></li>
                        <li><Link href="/news/tech" legacyBehavior><a>Technology</a></Link></li>
                        <li><Link href="/news/business" legacyBehavior><a>Business</a></Link></li>
                        <li><Link href="/news/health" legacyBehavior><a>Health</a></Link></li>
                        <li><Link href="/news/sports" legacyBehavior><a>Sports</a></Link></li>
                        <li><Link href="/news/science" legacyBehavior><a>Science</a></Link></li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar