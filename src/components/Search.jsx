import axios from 'axios';
import React, { useRef, useState } from 'react'
import Item from './Item';

const Search = () => {
  const searchValue = useRef("");

  const [searchResult, setSearchResult] = useState([]);

  const inputChangeHandle = e => {
    const {value} = e.target;
    searchValue.current = value.trim();
  }

  const sendData = async () => {
    try {
      const fetch = await axios({
        url: `https://shop.cyberlearn.vn/api/Product?keyword=${searchValue.current}`,
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
    searchValue.current ? sendData() : setSearchResult([]);
  }

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
              <input type="text" placeholder="Nhập từ khóa!!" onChange={e => inputChangeHandle(e)} />
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