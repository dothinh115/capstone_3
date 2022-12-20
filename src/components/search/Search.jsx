import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { http } from '../../util/config';
import Item from '../item/Item';

const Search = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [params, setParams] = useSearchParams();

  const inputChangeHandle = e => {
    const {value} = e.target;
    setSearchValue(value.trim());
  }

  const sendData = async (value) => {
    try {
      const fetch = await http.get(`/api/Product?keyword=${value}`);
      const sort = params.get("sortby");
      if(sort) {
        sortBy(sort, fetch.data.content);
      }
      else {
        setSearchResult(fetch.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandle = e => {
    e.preventDefault();
    if(searchValue) {
      setParams({
        keywords: searchValue
      });
      sendData(searchValue);
    }
  }

  const sortBy = (value, arr) => {
    switch(value) {
      case "priceUp": {
        setSearchResult(arr.sort((a, b) => b.price - a.price));
        break;
      }
      case "priceDown": {
        setSearchResult(arr.sort((a, b) => a.price - b.price));
        break;
      }
      default: return
    }
  }

  const sortHandle = e => {
    e.preventDefault();
    const {value} = e.target;
    if(value !== "" && searchValue) {
      setParams({
        keywords: searchValue,
        sortby: value
      });
      sortBy(value, searchResult);
    }
  }

  useEffect(() => {
    const keywords = params.get("keywords");
    if (keywords) {
      setSearchValue(keywords);
      sendData(keywords);
    }
    
  }, [params.get("keywords")]);
  
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
              <input defaultValue={searchValue} type="text" placeholder="Nhập từ khóa!!" onChange={e => inputChangeHandle(e)} />
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
            <select onChange={e => {sortHandle(e)}} defaultValue={params.get("sortby")}>
              <option value={null}>Lọc</option>
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