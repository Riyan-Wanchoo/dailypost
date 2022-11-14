import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from "../../styles/Category.module.css"

const Post = (props) => {
  // http://localhost:1337/api/stories?filters[$and][0][Category][$eq]=World
  //to fetch news by category
  const router = useRouter()
  const [data, setData] = useState({})
  const [datanot, setDatanot] = useState([])
  const [allData, setAllData] = useState([])
  const [DontMiss, setDontMiss] = useState([])
  //fetching category from query
  const { category } = router.query

  useEffect(() => {
    if (category != undefined) {
      props.setProgress(20)
      fetchPosts(category);
      fetchPostsNot(category);
      fetchDontMiss(category);
    }
  }, [category])


  const fetchPosts = async (category) => {
    if (category != undefined) {
      const TrendingNews = await fetch(`${process.env.apiHost}/api/stories?filters[$and][0][Category][$eq]=${category.charAt(0).toUpperCase() + category.slice(1)}&sort=id:DESC&filters[$and][1][Trending][$eq]=true&populate=*`, {
        headers: {
          'Authorization': `bearer ${process.env.publicAccessToken}`,
        },
      })
      const TrendingNewsRes = await TrendingNews.json()
      if (TrendingNewsRes.data.length == 0) {
        //do nothing :)))))))
      }
      else {
        props.setProgress(60)
        setData(TrendingNewsRes)
      }
    }
  };
  const fetchPostsNot = async (category) => {
    if (category != undefined) {
      const NotTrendingNews = await fetch(`${process.env.apiHost}/api/stories?filters[$and][0][Category][$eq]=${category.charAt(0).toUpperCase() + category.slice(1)}&sort=id:DESC&filters[$and][1][Trending][$eq]=false&populate=*`, {
        headers: {
          'Authorization': `bearer ${process.env.publicAccessToken}`,
        },
      })
      const NotTrendingNewsRes = await NotTrendingNews.json()
      if (NotTrendingNewsRes.data.length == 0) {
        //do nothing :)))))))
      }
      else {
        const sliced = NotTrendingNewsRes.data.slice(0, 6)
        const slicedAll = NotTrendingNewsRes.data.slice(7)
        setDatanot(sliced)
        setAllData(slicedAll)
        props.setProgress(80)
      }
    }
  }

  const fetchDontMiss = async (category) => {
    if (category != undefined) {
      const DontMissNews = await fetch(`${process.env.apiHost}/api/stories?filters[$and][0][Category][$ne]=${category.charAt(0).toUpperCase() + category.slice(1)}&sort=id:DESC&filters[$and][1][Trending][$eq]=true&populate=*`, {
        headers: {
          'Authorization': `bearer ${process.env.publicAccessToken}`,
        },
      })
      const DontMissRes = await DontMissNews.json()
      if (DontMissRes.data.length == 0) {
        //do nothing :)))))))
      }
      else {
        const slicedDontMiss = DontMissRes.data.slice(0, 7)
        setDontMiss(slicedDontMiss)
        props.setProgress(100)
      }
    }
  }

  return (
    <div className={styles.categoryCont}>
      <Head>
        <title>{category && category.charAt(0).toUpperCase() + category.slice(1)} News | Dailypost</title>
      </Head>
      <div className={styles.Contmn34r}>
        <div className={styles.contInner}>
          <div className={styles.InnerLeft}>
            <div className={styles.topNews}>
              <div className={styles.topNewsUp}>
                {data.data && data.data[0] &&  
                  <div className={styles.topNewsUpItem}>
                    <img src={process.env.apiHost + data.data[0].attributes.Image.data[0].attributes.url} alt="" />
                    <Link href={`/news/category/${data.data[0].attributes.Slug}`}><h2>{data.data[0].attributes.Title}</h2></Link>
                  </div>
                }
                {data.data && data.data[1] &&
                  <div className={styles.topNewsUpItem}>
                    <img src={process.env.apiHost + data.data[1].attributes.Image.data[0].attributes.url} alt="" />
                    <Link href={`/news/category/${data.data[1].attributes.Slug}`}><h2>{data.data[1].attributes.Title}</h2></Link>
                  </div>}
              </div>
              <div className={styles.topNewsDown}>
                {data.data && data.data[2] &&
                  <div className={styles.topNewsDownItem}>
                    <img src={data.data && process.env.apiHost + data.data[2].attributes.Image.data[0].attributes.url} alt="" />
                    <Link href={`/news/category/${data.data[2].attributes.Slug}`}><h4>{data.data && data.data[2].attributes.Title}</h4></Link>
                  </div>
                }
                {data.data && data.data[3] &&
                  <div className={styles.topNewsDownItem}>
                    <img src={data.data && process.env.apiHost + data.data[3].attributes.Image.data[0].attributes.url} alt="" />
                    <Link href={`/news/category/${data.data[3].attributes.Slug}`}><h4>{data.data && data.data[3].attributes.Title}</h4></Link>
                  </div>
                }
                {data.data && data.data[4] &&
                  <div className={styles.topNewsDownItem}>
                    <img src={data.data && process.env.apiHost + data.data[4].attributes.Image.data[0].attributes.url} alt="" />
                    <Link href={`/news/category/${data.data[4].attributes.Slug}`}><h4>{data.data && data.data[4].attributes.Title}</h4></Link>
                  </div>
                }
              </div>
            </div>
            <span className={styles.latestHeader}>Latest News</span>
            <hr />
            <div className={styles.LatestNews}>
              {datanot && console.log(datanot)}
              {datanot && datanot.map((datanotItem) => {
                return (<Link href={`/news/category/${datanotItem.attributes.Slug}`} key={datanotItem.attributes.Slug}><div className={styles.latestNewsItem}>
                  <img src={process.env.apiHost + datanotItem.attributes.Image.data[0].attributes.url} alt="" />
                  <h6>{datanotItem.attributes.Title}</h6>
                </div></Link>)
              })}
            </div>
            <div className={styles.AllNews}>
              <h3>All {category && category.charAt(0).toUpperCase() + category.slice(1)} News</h3>
              <hr />
              <div className={styles.allNewsItems}>
                {allData && allData.map((allDataItem) => {
                  return (
                    <Link href={`/news/category/${allDataItem.attributes.Slug}`} key={allDataItem.attributes.Slug}><div className={styles.allNewsItem}>
                      {/*Code this later*/}
                      <div className={styles.allNewsLeft}>
                        <img src={process.env.apiHost + allDataItem.attributes.Image.data[0].attributes.url} alt="" />
                      </div>
                      <div className={styles.allNewsRight}>
                        <div className={styles.allNewsItemTitle}>{allDataItem.attributes.Title}</div>
                        <div className={styles.author}>Author: {allDataItem.attributes.Author} | {new Date(allDataItem.attributes.publishedAt).toLocaleString(undefined, { timeZone: 'Asia/Kolkata', year: 'numeric', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })} </div>
                        <div className={styles.allNewsItemDesc}>
                          {allDataItem.attributes.Description}
                        </div>
                      </div>
                    </div></Link>)
                })}
              </div>
            </div>
          </div>
          <div className={styles.InnerRight}>
            <h3>Don&apos;t Miss</h3>
            <div className={styles.InnerRightNews}>
              {DontMiss && DontMiss.map((DontMissItem) => {
                return (
                  <Link href={`/news/category/${DontMissItem.attributes.Slug}`} key={DontMissItem.attributes.Slug}><div className={styles.InnerRightNewsItem}>
                    <div className={styles.NewsItemLeft}>
                      <img src={process.env.apiHost + DontMissItem.attributes.Image.data[0].attributes.url} alt="" />
                    </div>
                    <div className={styles.NewsItemDown}>
                      <h5>{DontMissItem.attributes.Title}</h5>
                      <p>{DontMissItem.attributes.Description}</p>
                    </div>
                  </div></Link>)
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post