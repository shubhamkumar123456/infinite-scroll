import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
const Home = () => {
    const [totalPage, settotalPage] = useState(0);
    const [page, setpage] = useState(1);
    console.log("page = ", page)
   
    let limit = 5
    const [products, setproducts] = useState([]);
    console.log(products)
  
    const [loading, setloading] = useState(false);
  
   

    const getAllData = async () => {
        setloading(true)
       try {
        let res = await fetch(`http://localhost:8080/posts/getAllpost?limit=${limit}&page=${page}`)
        let data =await res.json();
        console.log(data)
        // sethasMore(page<data.totalPage-1)
        settotalPage(data.totalPage)
        setproducts((prev)=>[...prev,...data.post])
        setloading(false)
       } catch (error) {
        console.log(error.message)
       }
    }

    useEffect(()=>{
        getAllData()
    },[])

    const fetchMoreData = ()=>{
        setpage(page+1)
        getAllData()
    }
    return (
        <div>
            <h1>This is home page</h1>
            <InfiniteScroll
    dataLength={products.length}
    next={fetchMoreData}
   
  
    hasMore={page<totalPage}
    loader={<h4>Loading...</h4>}
    endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
    }
   
  >
    {
                products.map((ele)=>{
                    return <div style={{height:"400px",backgroundColor:"grey",marginBottom:"10px"}}>
                       {ele.title? <p>{ele.title}</p>:<p>{ele.description}</p>}
                    </div>
                })
            }
  </InfiniteScroll>
           
        </div>
    )
}

export default Home
