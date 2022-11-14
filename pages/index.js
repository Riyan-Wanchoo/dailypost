import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
// https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/sort-pagination.html#sorting
// Refer this for slug sorting and reversing the order of sent data ie. Latest first then old one
function Home(props) {
  const [buttonStyle, setButton] = useState({
    display: "none",
    width: "60px",
    height: "60px",
    position: "fixed",
    top: "88%",
    right: "2%",
    cursor: "pointer",
    zIndex: 34032804
  })
  const [svgFill, setsvgFill] = useState("#0195dd")
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
          cursor: "pointer",
          zIndex: 34032804
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
          cursor: "pointer",
          zIndex: 34032804
        })
      }
    })
    if (document.readyState == "interactive") {
      props.setProgress(100)
    }

  }, [])
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const ScrollHover = () => {
    setsvgFill("#077fba")
  }
  const removeHover = () => {
    setsvgFill("#0195dd")
  }

  const title = "Dailypost - Share awareness, gain awareness"
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>
      <svg onClick={goToTop} onMouseOver={ScrollHover} onMouseLeave={removeHover} style={buttonStyle} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><g fill={svgFill}><path d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM112.9868,78.5868c-2.24173,2.24173 -5.8652,2.24173 -8.10693,0l-13.14653,-13.14653v54.95973c0,3.1648 -2.5628,5.73333 -5.73333,5.73333c-3.17053,0 -5.73333,-2.56853 -5.73333,-5.73333v-54.95973l-13.14653,13.14653c-2.24173,2.24173 -5.8652,2.24173 -8.10693,0c-2.24173,-2.24173 -2.24173,-5.8652 0,-8.10693l22.93333,-22.93333c1.118,-1.118 2.58573,-1.67987 4.05347,-1.67987c1.46773,0 2.93547,0.56187 4.05347,1.67987l22.93333,22.93333c2.24173,2.24173 2.24173,5.8652 0,8.10693z"></path></g></g></svg>
      <div className={styles.outerWrapper}>
        <div className={styles.topnews}>
          <div className={styles.left}>
            <div className={styles.innerleft}>
              <div>
                <Link href={`/news/category/${props.Trending.data[0].attributes.Slug}`} legacyBehavior><a>
                  {/* <img src="/dailypost-logo.png" alt="" /> */}
                  <Image className={styles.imgWidth}
                    alt="Thumbnail"
                    src={process.env.apiHost + props.Trending.data[0].attributes.Image.data[0].attributes.url}
                    width="690"
                    height="381"
                    priority
                  />
                  <h4 className={styles.captionBig}>{props.Trending.data[0] && props.Trending.data[0].attributes.Title}</h4>
                </a>
                </Link>
              </div>
            </div>
            <div className={styles.hrEnd} />
          </div>
          <div className={styles.right}>
            <ul>
              <li>
                <Link href={`/news/category/${props.Trending.data[1].attributes.Slug}`} legacyBehavior><a>
                  {/* <img src="/dailypost-logo.png" alt="" /> */}
                  <Image className={styles.imgWidth}
                    alt="Thumbnail"
                    src={process.env.apiHost + props.Trending.data[1].attributes.Image.data[0].attributes.url}
                    width="300"
                    height="179"
                  />
                  <h4 id={styles.one} className={`${styles.caption} ${styles.top}`}>{props.Trending.data[1].attributes.Title}</h4>
                </a>
                </Link>
              </li>
              <div className={styles.hrEnd} />
              <li>
                <Link href={`/news/category/${props.Trending.data[2].attributes.Slug}`} legacyBehavior>
                  <a>
                    {/* <img src="/dailypost-logo.png" alt="" /> */}
                    <Image className={styles.imgWidth}
                      alt="Thumbnail"
                      src={process.env.apiHost + props.Trending.data[2].attributes.Image.data[0].attributes.url}
                      width="300"
                      height="179"
                    />
                    <h4 id={styles.two} className={`${styles.caption} ${styles.top}`}>{props.Trending.data[2].attributes.Title}</h4>
                  </a>
                </Link>
              </li>
              <div className={styles.hrEnd} />
              <li>
                <Link href={`/news/category/${props.Trending.data[3].attributes.Slug}`} legacyBehavior>
                  <a>
                    {/* <img src="/dailypost-logo.png" alt="" /> */}
                    {console.log(props.Trending.data[3].attributes)}
                    <Image className={styles.imgWidth}
                      alt="Thumbnail"
                      src={process.env.apiHost + props.Trending.data[3].attributes.Image.data[0].attributes.url}
                      width="300"
                      height="179"
                    />
                    <h4 id={styles.three} className={`${styles.caption} ${styles.btm}`}>{props.Trending.data[3].attributes.Title}</h4>
                  </a>
                </Link>
              </li>
              <div className={styles.hrEnd} />
              <li>
                <Link href={`/news/category/${props.Trending.data[4].attributes.Slug}`} legacyBehavior>
                  <a>
                    {/* <img src="/dailypost-logo.png" alt="" /> */}
                    <Image className={styles.imgWidth}
                      alt="Thumbnail"
                      src={process.env.apiHost + props.Trending.data[4].attributes.Image.data[0].attributes.url}
                      width="300"
                      height="179"
                    />
                    <h4 id={styles.four} className={`${styles.caption} ${styles.btm}`}>{props.Trending.data[4].attributes.Title}</h4>
                  </a>
                </Link>
              </li>
              <div className={styles.hrEnd} />
            </ul>
          </div>
        </div>
      </div>



      <div className={styles.storyContainer}>
        <div className={styles.stories}>
          <div className={styles.storyHeader}>
            <h5 className={styles.topStoriesHeader}>Top Stories</h5>
          </div>




          {props.TopNews==[]?"No News to display":props.TopNews.map((TopNews) => {
            return (
              <div className={styles.storyItem} key={TopNews.id}>
                <Link href={`/news/category/${TopNews.attributes.Slug}`} legacyBehavior>
                  <a>
                    <p className={styles.storytitle}>
                      <b>{"• " + TopNews.attributes.Title}</b>
                    </p>
                  </a>
                </Link>
              </div>
            )
          })}



        </div>
        <div className={styles.latestNews}>
          <h5 className={styles.latestHeader}>Latest News</h5>



          {props.LatestNews && props.LatestNews.map((LatestNews) => {
            return (<div className={styles.newsItem} key={LatestNews.id}>
              <div className={styles.imageHolder}>
                {/* <img className={styles.imgWidth} src='/dailypost-logo.png' alt="" /> */}


                <Image className={styles.imgWidth}
                  alt="Thumbnail"
                  src={process.env.apiHost + LatestNews.attributes.Image.data[0].attributes.url}
                  width="200"
                  height="150"
                />
              </div>
              <Link href={`/news/category/${LatestNews.attributes.Slug}`} legacyBehavior>
                <a>
                  <div className={styles.content}>
                    <p className={styles.category}><b>{LatestNews.attributes.Category}</b></p>
                    <p className={styles.title}>{LatestNews.attributes.Title}</p>
                    <p className={styles.desc}>{LatestNews.attributes.Description}</p>
                  </div>
                </a>
              </Link>
            </div>)
          })}




        </div>
        <div className={styles.mayAlsoLike}>
          <h5 className={styles.malHeader}>Also Read</h5>

          {props.AlsoRead==[]?"No news to display":props.AlsoRead.map((AlsoRead) => {
            return (
              <div className={styles.malItem} key={AlsoRead.id}>
                <Link href={`/news/category/${AlsoRead.attributes.Slug}`} legacyBehavior>
                  <a>
                    {/* <img src="/dailypost-logo.png" alt="" className={styles.malImg} /> */}
                    <Image className={styles.malImg}
                      alt="Thumbnail"
                      src={process.env.apiHost + AlsoRead.attributes.Image.data[0].attributes.url}
                      width="265"
                      height="190"
                    />
                    <div className={styles.malCategory}>
                      {AlsoRead.attributes.Category}
                    </div>
                    <div className={styles.malTitle}>
                      <b>{AlsoRead.attributes.Title}</b>
                    </div>
                  </a>
                </Link>
              </div>
            )
          })}



        </div>
      </div>

      <div className={styles.hrEnd} style={{ margin: " 3rem 0" }} />

      {props.Category && Object.keys(props.Category).map((CategoryItem) => {
        return (<div className={styles.djhOuter} key={CategoryItem}>
          <div className={styles.djh}>
            <div className={styles.two}>
              <h2>{CategoryItem}</h2>
              <Link href={`/news/${CategoryItem}`} legacyBehavior>
                <a>
                  <h5 style={{ marginBottom: "0px" }}> All {CategoryItem} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                  </svg>
                  </h5>
                </a>
              </Link>
            </div>
            <hr />
            <div className={styles.djhCont}>
              <div className={`${styles.djhStories} ${styles.story1}`}>
                {props.Category[CategoryItem].notTrending1 && props.Category[CategoryItem].notTrending1.map((notTrending1Item) => {
                  return (
                    <div className={styles.storyItem} key={notTrending1Item.id}>
                      <Link href={`/news/category/${notTrending1Item.attributes.Slug}`} legacyBehavior>
                        <a>
                          <p className={styles.storytitle}>
                            <b>• {notTrending1Item.attributes.Title}</b>
                          </p>
                        </a>
                      </Link>
                    </div>
                  )
                })}
              </div>

              <div className={styles.djhCards}>
                {props.Category[CategoryItem] && props.Category[CategoryItem].Trending.map((Trending) => {
                  return (<div key={Trending.id}>
                    <Link href={`/news/category/${Trending.attributes.Slug}`} legacyBehavior>
                      <a>
                        <div className={styles.djhCard}>
                          <Image className={styles.malImg}
                            alt="Thumbnail"
                            src={process.env.apiHost + Trending.attributes.Image.data[0].attributes.url}
                            width="287"
                            height="161"
                          />
                          <span>{Trending.attributes && Trending.attributes.Title}</span>
                        </div>
                      </a>
                    </Link>
                  </div>)
                })}
              </div>

              <div className={`${styles.djhStories} ${styles.story2}`} style={{ marginLeft: "20px" }}>
                {props.Category[CategoryItem].notTrending2 && props.Category[CategoryItem].notTrending2.map((notTrending2Item) => {
                  return (
                    <div className={styles.storyItem} key={notTrending2Item.id}>
                      <Link href={`/news/category/${notTrending2Item.attributes.Slug}`} legacyBehavior>
                        <a>
                          <p className={styles.storytitle}>
                            <b>• {notTrending2Item.attributes.Title}</b>
                          </p>
                        </a>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>)
      })}



      <div className={styles.moreCatWrap}>
        <div className={styles.moreCat}>
          <div className={styles.moreCatLeft}>
            <div className={`${styles.two} ${styles.twoMoreCat}`}>
              <h2>Business</h2>
              <Link href={`/news/Business`} legacyBehavior>
                <a>
                  <h5 className={styles.all}> All Business <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                  </svg>
                  </h5>
                </a>
              </Link>
            </div>
            <hr />
            <div className={styles.mainCatCont}>
              <div className={styles.mclLeft}>
                <Link href={`/news/category/${props.MoreCategory.Business.Trending.data[0].attributes.Slug}`} legacyBehavior>
                  <a>
                    <Image className={styles.imgWidth}
                      alt="Thumbnail"
                      src={process.env.apiHost + props.MoreCategory.Business.Trending.data[0].attributes.Image.data[0].attributes.url}
                      width="300"
                      height="190"
                      priority
                    />
                    <h4>{props.MoreCategory.Business.Trending.data[0].attributes.Title}</h4>
                  </a>
                </Link>
              </div>
              <div className={styles.mclRight}>
                {props.MoreCategory.Business.notTrending && props.MoreCategory.Business.notTrending.map((notTrendingItem) => {
                  return (
                    <Link href={`/news/category/${notTrendingItem.attributes.Slug}`} key={notTrendingItem.attributes.Slug} legacyBehavior>
                      <a>
                        <p className={`${styles.mclRightItem} ${styles.firstmclItem}`}>
                          • {notTrendingItem.attributes.Title}
                        </p>
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>


          <div className={styles.moreCatRight}>
            <div className={`${styles.two} ${styles.twoMoreCat}`}>
              <h2>Technology</h2>
              <Link href={`/news/Technology`} legacyBehavior>
                <a>
                  <h5 className={styles.all}> All Technology <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                  </svg>
                  </h5>
                </a>
              </Link>
            </div>
            <hr />
            <div className={styles.mainCatCont}>
              <div className={styles.mclLeft}>
                <Link href={`/news/category/${props.MoreCategory.Technology.Trending.data[0].attributes.Slug}`} legacyBehavior>
                  <a>
                    <Image className={styles.imgWidth}
                      alt="Thumbnail"
                      src={process.env.apiHost + props.MoreCategory.Technology.Trending.data[0].attributes.Image.data[0].attributes.url}
                      width="300"
                      height="190"
                    />
                    <h4>{props.MoreCategory.Technology.Trending.data[0].attributes.Title}</h4>
                  </a>
                </Link>
              </div>
              <div className={styles.mclRight}>
                {props.MoreCategory.Technology.notTrending && props.MoreCategory.Technology.notTrending.map((notTrendingItem) => {
                  return (
                    <Link href={`/news/category/${notTrendingItem.attributes.Slug}`} key={notTrendingItem.attributes.Slug} legacyBehavior>
                      <a>
                        <p className={`${styles.mclRightItem} ${styles.firstmclItem}`}>
                          • {notTrendingItem.attributes.Title}
                        </p>
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>


        <div className={styles.moreCat}>
          <div className={styles.moreCatLeft}>
            <div className={`${styles.two} ${styles.twoMoreCat}`}>
              <h2>Health</h2>
              <Link href={`/news/Health`} legacyBehavior>
                <a>
                  <h5 className={styles.all}> All Health <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                  </svg>
                  </h5>
                </a>
              </Link>
            </div>
            <hr />
            <div className={styles.mainCatCont}>
              <div className={styles.mclLeft}>
                <Link href={`/news/category/${props.MoreCategory.Health.Trending.data[0].attributes.Slug}`} legacyBehavior>
                  <a>
                    <Image className={styles.imgWidth}
                      alt="Thumbnail"
                      src={process.env.apiHost + props.MoreCategory.Health.Trending.data[0].attributes.Image.data[0].attributes.url}
                      width="300"
                      height="190"
                      priority
                    />
                    <h4>{props.MoreCategory.Health.Trending.data[0].attributes.Title}</h4>
                  </a>
                </Link>
              </div>
              <div className={styles.mclRight}>
                {props.MoreCategory.Health.notTrending && props.MoreCategory.Health.notTrending.map((notTrendingItem) => {
                  return (
                    <Link href={`/news/category/${notTrendingItem.attributes.Slug}`} key={notTrendingItem.attributes.Slug} legacyBehavior>
                      <a>
                        <p className={`${styles.mclRightItem} ${styles.firstmclItem}`}>
                          • {notTrendingItem.attributes.Title}
                        </p>
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={styles.moreCatRight}>
            <div className={`${styles.two} ${styles.twoMoreCat}`}>
              <h2>Science</h2>
              <Link href={`/news/Science`} legacyBehavior>
                <a>
                  <h5 className={styles.all}> All Science <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                  </svg>
                  </h5>
                </a>
              </Link>
            </div>
            <hr />
            <div className={styles.mainCatCont}>
              <div className={styles.mclLeft}>
                <Link href={`/news/category/${props.MoreCategory.Science.Trending.data[0].attributes.Slug}`} legacyBehavior>
                  <a>
                    <Image className={styles.imgWidth}
                      alt="Thumbnail"
                      src={process.env.apiHost + props.MoreCategory.Science.Trending.data[0].attributes.Image.data[0].attributes.url}
                      width="300"
                      height="190"
                      priority
                    />
                    <h4>{props.MoreCategory.Science.Trending.data[0].attributes.Title}</h4>
                  </a>
                </Link>
              </div>
              <div className={styles.mclRight}>
                {props.MoreCategory.Science.notTrending && props.MoreCategory.Science.notTrending.map((notTrendingItem) => {
                  return (
                    <Link href={`/news/category/${notTrendingItem.attributes.Slug}`} key={notTrendingItem.attributes.Slug} legacyBehavior>
                      <a>
                        <p className={`${styles.mclRightItem} ${styles.firstmclItem}`}>
                          • {notTrendingItem.attributes.Title}
                        </p>
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps() {
  const DJHcategories = ["India", "World", "Entertainment", "Sports"]
  const MoreCategories = ["Business", "Technology", "Health", "Science"]

  let Data = {
    "India": {},
    "World": {},
    "Entertainment": {},
    "Sports": {}
  }
  let DataMoreCat = {
    "Business": {},
    "Technology": {},
    "Health": {},
    "Science": {}
  }

  //?sort=id:DESC to sort in descending order, oof took me 4 hours to find this shit
  const res = await fetch(`${process.env.apiHost}/api/stories?sort=id:DESC&filters[$and][0][Trending][$ne]=true&populate=*`, {
    headers: {
      'Authorization': `bearer ${process.env.publicAccessToken}`,
    },
  })
  const notTrending = await res.json()

  //Only Trending
  const resTrending = await fetch(`${process.env.apiHost}/api/stories?sort=id:DESC&filters[$and][0][Trending][$eq]=true&populate=*`, {
    headers: {
      'Authorization': `bearer ${process.env.publicAccessToken}`,
    },
  })
  const Trending = await resTrending.json()


  //Category
  for (let i = 0; i < DJHcategories.length; i++) {
    const resCatTrending = await fetch(`${process.env.apiHost}/api/stories?sort=id:DESC&filters[$and][0][Trending][$eq]=true&filters[$and][0][Category][$eq]=${DJHcategories[i]}&populate=*`, {
      headers: {
        'Authorization': `bearer ${process.env.publicAccessToken}`,
      },
    })
    const CatTrending = await resCatTrending.json()


    const resCat = await fetch(`${process.env.apiHost}/api/stories?sort=id:DESC&filters[$and][0][Category][$eq]=${DJHcategories[i]}&populate=*`, {
      headers: {
        'Authorization': `bearer ${process.env.publicAccessToken}`,
      },
    })
    const catResponse = await resCat.json()

    //Two Category Stories sorting
    const notTrending1 = catResponse.data.slice(0, 7)
    const notTrending2 = catResponse.data.slice(7, 14)
    const Trending = CatTrending.data.slice(0, 4)

    if (i == 0) {
      Data.India.Trending = Trending
      Data.India.notTrending1 = notTrending1
      Data.India.notTrending2 = notTrending2
    }
    else if (i == 1) {
      Data.World.Trending = Trending
      Data.World.notTrending1 = notTrending1
      Data.World.notTrending2 = notTrending2
    }
    else if (i == 2) {
      Data.Entertainment.Trending = Trending
      Data.Entertainment.notTrending1 = notTrending1
      Data.Entertainment.notTrending2 = notTrending2
    }
    else if (i == 3) {
      Data.Sports.Trending = Trending
      Data.Sports.notTrending1 = notTrending1
      Data.Sports.notTrending2 = notTrending2
    }
  }

  //More Category
  for (let i = 0; i < MoreCategories.length; i++) {
    const resMoreCatTrending = await fetch(`${process.env.apiHost}/api/stories?sort=id:DESC&filters[$and][0][Trending][$eq]=true&filters[$and][0][Category][$eq]=${MoreCategories[i]}&populate=*`, {
      headers: {
        'Authorization': `bearer ${process.env.publicAccessToken}`,
      },
    })
    const MoreCatTrending = await resMoreCatTrending.json()


    const resMoreCat = await fetch(`${process.env.apiHost}/api/stories?sort=id:DESC&filters[$and][0][Category][$eq]=${MoreCategories[i]}&populate=*`, {
      headers: {
        'Authorization': `bearer ${process.env.publicAccessToken}`,
      },
    })
    const MoreCatResponse = await resMoreCat.json()

    //Two Category Stories sorting
    const NotTrendingMoreCat = MoreCatResponse.data.slice(0, 5)

    if (i == 0) {
      DataMoreCat.Business.Trending = MoreCatTrending
      DataMoreCat.Business.notTrending = NotTrendingMoreCat
    }
    else if (i == 1) {
      DataMoreCat.Technology.Trending = MoreCatTrending
      DataMoreCat.Technology.notTrending = NotTrendingMoreCat
    }
    else if (i == 2) {
      DataMoreCat.Health.Trending = MoreCatTrending
      DataMoreCat.Health.notTrending = NotTrendingMoreCat
    }
    else if (i == 3) {
      DataMoreCat.Science.Trending = MoreCatTrending
      DataMoreCat.Science.notTrending = NotTrendingMoreCat
    }
  }

  //Distinguishing between, TopNews, Latest News, Also Read
  const slicedNT = notTrending.data.slice(0, 6);
  const slicedAlsoRead = notTrending.data.slice(7, 13);
  const slicedTopNews = notTrending.data.slice(14);
  return {
    props: {
      Trending: Trending,
      LatestNews: slicedNT,
      AlsoRead: slicedAlsoRead,
      TopNews: slicedTopNews,
      Category: Data,
      MoreCategory: DataMoreCat
    }
  }
}

export default Home