import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styles from "../../../styles/Slug.module.css"
import NotFound from "../../404"
import { BiSend } from "react-icons/bi"
import Cookies from 'js-cookie'
import Link from 'next/link'

const Slug = (props) => {
  const [post, setPost] = useState({})
  const router = useRouter()
  const { slug } = router.query
  const [svgFill, setsvgFill] = useState("#0195dd")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState()
  const [buttonStyle, setButton] = useState({
    display: "none",
    width: "60px",
    height: "60px",
    position: "fixed",
    top: "88%",
    right: "2%",
    cursor: "pointer",
  })
  const [commentTxt, setCommentTxt] = useState('')
  const [commentData, setCommentData] = useState({})
  useEffect(() => {
    props.setProgress(25)
    fetchPost(slug);
    setLocation(window.location.href)
  }, [slug]);
  useEffect(() => {
    fetchComments(slug);
  }, [])
  const [encodedText, setEncodedText] = useState()


  //Copy to Clipboard
  const copy = useRef(null)
  const copied = useRef(null)
  //Share on ******
  const encodedUrl = encodeURIComponent(location).replace(/'/g, "%27").replace(/"/g, "%22");

  const [width, setWidth] = useState("0px")
  const [marginLeft, setMarginLeft] = useState("0px")

  function createMarkup(c) {
    return { __html: c };
  }


  const fetchPost = async (slug) => {
    if (slug != undefined) {
      const resSlug = await fetch(`${process.env.apiHost}/api/stories?filters[Slug][$eq]=${slug}&populate=*`, {
        headers: {
          'Authorization': `bearer ${process.env.publicAccessToken}`,
        },
      })
      const OneNews = await resSlug.json()
      if (OneNews.data.length == 0) {
        setPost("NoNews")
      }
      else {
        props.setProgress(100)
        setPost(OneNews)

        if (OneNews.data) {
          setDate(new Date(OneNews.data[0].attributes.publishedAt).toLocaleString(undefined, { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }))
        }
      }
    }
  };
  const fetchComments = async () => {
    const allComments = await fetch(`${process.env.apiHost}/api/comments?filters[$and][0][NewsSlug][$eq]=${slug}&sort=id:DESC`)
    const allCommentsres = await allComments.json()
    setCommentData(allCommentsres)
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        setButton({
          display: "block",
          width: "60px",
          height: "60px",
          position: "fixed",
          top: "88%",
          right: "2%",
          cursor: "pointer"
        })
      }
      else if (document.body.scrollTop < 500 || document.documentElement.scrollTop < 500) {
        setButton({
          display: "none",
          width: "60px",
          height: "60px",
          position: "fixed",
          top: "88%",
          right: "2%",
          cursor: "pointer"
        })
      }
    })
  }, [])


  const handleCopy = () => {
    navigator.clipboard.writeText(location)
    copy.current.style.display = "none"
    copied.current.style.display = "block"

    props.notify("Copied to Clipboard", "success")
    setTimeout(() => {
      copy.current.style.display = "block"
      copied.current.style.display = "none"
    }, 4000);
  }
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const ScrollHover = () => {
    setsvgFill("#077fba")
  }
  const removeHover = () => {
    setsvgFill("#0195dd")
  }


  const openNav = () => {
    setWidth("350px");
    fetchComments()
  }
  const closeNav = () => {
    setWidth("0px");
  }

  const handleChange = (e) => {
    setCommentTxt(e.target.value)
  }

  const handleComment = async () => {
    if (commentTxt == '') {
      props.notify("Comment cannot be blank", "error")
    }
    else {
      if (Cookies.get("jwt")) {
        const commentInfo = {
          Text: commentTxt,
          Author: Cookies.get("username"),
          NewsSlug: slug
        }

        const commentRes = await fetch(`${process.env.apiHost}/api/comments`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${Cookies.get("jwt")}`,
          },
          body: JSON.stringify({ data: commentInfo }),
        });
        const commentResponse = await commentRes.json()

        const allComments = await fetch(`${process.env.apiHost}/api/comments?filters[$and][0][NewsSlug][$eq]=${slug}&sort=id:DESC`)
        const allCommentsres = await allComments.json()
        setCommentData(allCommentsres)

      }
      else {
        props.notify("Log in to post a comment", "error")
      }
    }
    setCommentTxt('')
  }
  const Title = post.data[0].attributes.Title
  setEncodedText(Title.split('|').join(""))
  return (
    <>
      {post && post == "NoNews" ? <NotFound /> :
        // <div>{post.data && post.data[0].attributes.Title}</div>


        //Main Code-Html
        <div className={styles.container}>
          <Head>
            <title>{post.data && `${post.data[0].attributes.Title} | Dailypost`}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
          </Head>
          <div className={styles.innerCont}>
            <svg onClick={goToTop} onMouseOver={ScrollHover} onMouseLeave={removeHover} style={buttonStyle} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><g fill={svgFill}><path d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM112.9868,78.5868c-2.24173,2.24173 -5.8652,2.24173 -8.10693,0l-13.14653,-13.14653v54.95973c0,3.1648 -2.5628,5.73333 -5.73333,5.73333c-3.17053,0 -5.73333,-2.56853 -5.73333,-5.73333v-54.95973l-13.14653,13.14653c-2.24173,2.24173 -5.8652,2.24173 -8.10693,0c-2.24173,-2.24173 -2.24173,-5.8652 0,-8.10693l22.93333,-22.93333c1.118,-1.118 2.58573,-1.67987 4.05347,-1.67987c1.46773,0 2.93547,0.56187 4.05347,1.67987l22.93333,22.93333c2.24173,2.24173 2.24173,5.8652 0,8.10693z"></path></g></g></svg>
            <p className={styles.location}>
              <Link href="/">Home / </Link>
              <Link href="/">News / </Link>
              <Link href="/news/world">World / </Link>
              <Link href={`/news/category/${post.data && post.data[0].attributes.Slug}`}>{post.data && post.data[0].attributes.Slug}</Link>
            </p>
            {/* <h2 className={styles.newsHeader}>New York shooting: Man in gas mask fired 33 rounds; cops share image of 'person of interest' | Top points</h2> */}
            <h2 className={styles.newsHeader}>{post.data && post.data[0].attributes.Title}</h2>
            <i className={styles.desc}>{post.data && post.data[0].attributes.Description}</i>
            <div className={styles.timgCont}>
              <div className={styles.innerTimgCont}>
                <div className={styles.timgTop}>
                  <div className={styles.left}>
                    <img src="/dailypost-logo.png" alt="" />
                    <div className={styles.leftIn}>
                      <p className={styles.tTitle}>Dailypost</p>
                      <p className={styles.Author}>Author: {post.data && post.data[0].attributes.Author}</p>
                      <p className={styles.Date}>Published on {date && date} IST</p>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.facebook}>
                      <a target="_blank" rel="noreferrer" href={"https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl + "&amp;src=sdkpreparse"} data-bs-toggle="tooltip" data-bs-placement="top" title='Share on Facebook'>
                        <svg id={styles.icon1} title="Share on Facebook" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#3057a0" className="ico mx-2 bi bi-facebook" viewBox="0 0 16 16">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                      </a>
                    </div>
                    <div className={styles.twitter}>
                      <a target="_blank" rel="noreferrer" href={post.data && "https://twitter.com/intent/tweet?text=" + encodedText + "&url=" + encodedUrl} data-bs-toggle="tooltip" data-bs-placement="top" title='Share on Twitter'>
                        <svg id={styles.icon2} title="Share on Twitter" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#42bcf1" className="ico mx-2 bi bi-twitter" viewBox="0 0 16 16">
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                      </a>
                    </div>
                    <div className={styles.whatsapp}>
                      <a target="_blank" rel="noreferrer" href={"https://web.whatsapp.com/send?text=" + encodedUrl} data-bs-toggle="tooltip" data-bs-placement="top" title='Share on Whatsapp'>
                        <svg id={styles.icon3} title="Share on Whatsapp" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#1d9e10" className="ico mx-2 bi bi-whatsapp" viewBox="0 0 16 16">
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                        </svg>
                      </a>
                    </div>
                    <div className={styles.copy}>
                      <div>
                        <svg onClick={handleCopy} ref={copy} id={styles.icon4} title="Copy to Clipboard" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="ico mx-2 bi bi-clipboard" viewBox="0 0 16 16">
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                        <svg ref={copied} style={{ display: "none" }} id={styles.icon4} title="Copied to Clipboard" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="ico mx-2 bi bi-clipboard-check" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                      </div>
                    </div>
                    <div className={styles.comment}>
                      <a href='#comment'>
                        <svg id={styles.icon5} title="Post a Comment" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="orange" className="ico mx-2 bi bi-chat-fill" viewBox="0 0 16 16">
                          <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.timgBottom}>
                  <img className={styles.newsThumbnail} src={post.data && process.env.apiHost + post.data[0].attributes.Image.data[0].attributes.url} alt="" />
                  <p className={styles.imgDesc}>{post.data && post.data[0].attributes.ImageSubtitle}</p>
                  <hr />
                </div>
              </div>
            </div>

            <div className={styles.tContentCont}>
              {post.data && <div className={styles.tcontent} dangerouslySetInnerHTML={createMarkup(post.data[0].attributes.Content)}></div>}
              {/* <p>
                Multiple people were fired upon at a subway station in New York, US, on Tuesday, April 12. Fire personnel responding to reports of smoke at the 36th Street station in Sunset Park, Brooklyn, found multiple people shot.
              </p>
              <br />
              <p>
                The New York Police Department (NYPD) on Wednesday, April 13, put out a picture of Frank James, a person of interest in the investigation.
              </p>
              <br /><br />
              <span style={{ fontWeight: "700" }}>Here’s what we know about the incident so far:</span><br />
              <p>
                <strong>1.</strong> Over 20 people sustained various injuries after an unidentified gunman set off smoke bombs and opened fire at a subway station in Brooklyn, New York, during rush hours on Tuesday morning. Police said he fired 33 rounds.
              </p><br />
              <span style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "20px"}}>
                <img style={{ width: "90%" }} src="https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202204/New_York2-1200x2000.jpg?qyzde67oqyzV5lo9WZUDhjR8dAATdnjc" alt="" />
              </span>
              <p>
                <strong>2.</strong> According to a law enforcement source briefed on the investigation, preliminary information indicated the suspect was dressed in the attire of construction personnel from the Metropolitan Transportation Authority and was wearing a gas mask.
              </p><br />
              <p>
                <strong>3.</strong> US President Joe Biden said 10 people were shot at in the incident.
              </p><br />
              <p>
                <strong>4.</strong> The fire department and police were alerted by a fire alarm set off on a train at the station.
              </p><br />
              <p>
                <strong>5.</strong> Multiple smoke devices were found on the scene, mayoral spokesperson Fabien Levy said. There were also reports of explosive devices being found at the scene.
              </p><br />
              <p>
                <strong>6.</strong> Police described the suspected shooter as a Black man of about 5.5 feet and over 80 kg. Cops believe he acted alone. The motive is under investigation.
              </p><br />
              <span style={{ display: "flex", justifyContent: "center", margin: "15px 0px" }}>
                <iframe src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=indiatoday&amp;dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3NwYWNlX2NhcmQiOnsiYnVja2V0Ijoib2ZmIiwidmVyc2lvbiI6bnVsbH0sInRmd19zZW5zaXRpdmVfbWVkaWFfaW50ZXJzdGl0aWFsXzEzOTYzIjp7ImJ1Y2tldCI6ImludGVyc3RpdGlhbCIsInZlcnNpb24iOjR9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1513959711263100929&amp;lang=en&amp;origin=https%3A%2F%2Fwww.indiatoday.in%2Fworld%2Fstory%2Fnew-york-shooting-brooklyn-fbi-probe-top-points-1936787-2022-04-13&amp;sessionId=3ca0eb36d1e92953e153d8af4eb5fbda83729acd&amp;siteScreenName=indiatoday&amp;theme=light&amp;widgetsVersion=940dd9ee54270%3A1649359550911&amp;width=550px" frameBorder="0" style={{ width: "566px", height: "705px" }}></iframe>
              </span>
              <p>
                <strong>7.</strong> The Federal Bureau of Investigation is investigating the case with the New York Police Department.
              </p><br />
              <span style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                <img style={{ width: "90%" }} src="https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202204/New_York3-1200x3201.jpg?kQwbR9iV0xtGTZIpVMG72JxYt1Gmvftr" alt="" />
              </span>
              <p>
                <strong>8.</strong> Outside the station, in an area known for its thriving Chinatown and views of the Statue of Liberty, authorities shut down a dozen or so blocks and cordoned off the immediate vicinity with crime-scene tape. Schools in the neighbourhood were placed under security lockdowns.
              </p><br />
              <p>
                <strong>9.</strong> Trains servicing the 36th Street station were cancelled
              </p><br />
              <p>
                <strong>10.</strong> The White House is closely monitoring the situation. President Joe Biden said: "We're not letting up until the gunman is found."
              </p><br />
              <p>
                New York, the United States's most populous city, has seen a sharp rise in violent crime during the pandemic, including a spate of seemingly random attacks on New York City's subway. The system is one of the world's oldest and most extensive.
              </p><br />
              {/* <div
                                dangerouslySetInnerHTML={{ __html: Onenews.content }}
                            />
              <hr /> */}
            </div>

            <div className={styles.comment} id="comment">
              <button className={`${styles.button5} btn btn-primary`} type="button" onClick={openNav}>Post your Comment</button>
            </div>
            <div id="mySidenav" className={styles.sidenav} style={{ width: width, marginLeft: marginLeft }}>
              <a className={styles.closebtn} onClick={closeNav}>&times;</a>
              <h4>Comments ({commentData.data && commentData.meta.pagination.total})</h4>
              <div className={styles.commentCont}>
                {commentData.data && commentData.data.map((dataItem) => {
                  return (<div className={styles.commentItem} key={dataItem.id}>
                    <h5 className={styles.commentTitle}>{dataItem.attributes.Author} - <span className={styles.commentDate}>{dataItem.attributes.publishedAt}</span></h5>
                    <p className={styles.commentData}>{dataItem.attributes.Text}</p>
                  </div>)
                })}
                {commentData.data && commentData.data.length == 0 && <p>Be the first one to comment :)</p>}
              </div>
              <div className={styles.postCommentWrapper}>
                <div className={styles.postComment}>
                  <input onChange={handleChange} value={commentTxt} type="text" placeholder='Type your comment here' />
                  <BiSend size={30} onClick={handleComment} style={{ cursor: "pointer" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}


export default Slug