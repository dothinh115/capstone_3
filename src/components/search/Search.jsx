import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Item from '../item/Item';
import useCheckToken from '../../hooks/useCheckToken';

const Search = () => {
  const searchValue = useRef("");
  const [searchResult, setSearchResult] = useState([]);
  const [params, setParams] = useSearchParams();
  const checkToken = useCheckToken();

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
    if(searchValue.current) {
      setParams({
        keyWords: searchValue.current
      });
      sendData(searchValue.current);
    }
  }

  const sortBy = value => {
    switch(value) {
      case "priceUp": {
        setSearchResult(searchResult.sort((a, b) => b.price - a.price));
        break;
      }
      case "priceDown": {
        setSearchResult(searchResult.sort((a, b) => a.price - b.price));
        break;
      }
      default: return
    }
  }

  const sortHandle = e => {
    e.preventDefault();
    const {value} = e.target;
    if(value !== "" && searchValue.current) {
      setParams({
        keywords: searchValue.current,
      });
      sortBy(value);
    }
  }

  useEffect(() => {
    const keywords = params.get("keywords");
    if (keywords) {
      searchValue.current = keywords;
      sendData(keywords);
    }
    checkToken();
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
          <h1 style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <span>KẾT QUẢ</span>
            <select onChange={e => {sortHandle(e)}}>
              <option value="">Lọc</option>
              <option value="priceUp">Giá giảm dần</option>
              <option value="priceDown">Giá tăng dần</option>
            </select>
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