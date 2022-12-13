import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Item from './Item';

const Search = () => {
  const searchValue = useRef("");

  const [searchResult, setSearchResult] = useState([]);

  const [params, setParams] = useSearchParams();

  const inputChangeHandle = e => {
    const {value} = e.target;
    searchValue.current = value.trim();
  }

  const sendData = async (value) => {
    try {
      const fetch = await axios({
        url: `https://shop.cyberlearn.vn/api/Product?keyword=${value}`,
        method: "GET",
        dataType: "application/json",
      });
      setSearchResult(fetch.data.content);
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandle = e => {
    e.preventDefault();
    setParams({
      keywords: searchValue.current
    });
    sendData(searchValue);
  }

  useEffect(() => {
    const keywords = params.get("keywords");
    if(keywords) {
      searchValue.current = keywords;
      sendData(keywords);
    }
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="page-header">
          <h1>
            TÌM KIẾM
          </h1>
        </div>
        <div className="main-body">
          <form className="search" onSubmit={e => submitHandle(e)}>
            <div className="search-left">
              <i className="fa-solid fa-magnifying-glass"></i>
              Tìm kiếm
            </div>
            <div className="search-right">
              <input defaultValue={searchValue.current} type="text" placeholder="Nhập từ khóa!!" onChange={e => inputChangeHandle(e)} />
            </div>
            <div className="search-button" style={{marginLeft: "20px"}}>
              <button className="btn">Tìm</button>
            </div>
          </form>
        </div>
      </div>

      <div className="main-container" style={{ marginTop: "20px" }}>
        <div className="page-header">
          <h1>
            KẾT QUẢ
          </h1>
        </div>
        <div className="main-body">
          <div className="card">
            {searchResult?.map((item, index) => {
              return <Item key={index} item={item} />
            })}
            {searchResult.length === 0 && "Không có gì ở đây!"}
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Search