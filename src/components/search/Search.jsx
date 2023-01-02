import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { http } from "../../util/config";
import Item from "../item/Item";
import MainBlock from "../others/MainBlock";

const Search = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const inputChangeHandle = (e) => {
    const { value } = e.target;
    setSearchValue(value.trim());
  };

  const sendData = async (value) => {
    if (value === null) return;
    setLoading(true);
    try {
      const fetch = await http.get(`/api/Product?keyword=${value}`);
      const sort = params.get("sortby");
      sort
        ? sortBy(sort, fetch.data.content)
        : setSearchResult(fetch.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (searchValue) {
      setParams({
        keywords: searchValue,
      });
      sendData(searchValue);
    }
  };

  const sortBy = (value, arr) => {
    switch (value) {
      case "priceUp": {
        setSearchResult(arr.sort((a, b) => b.price - a.price));
        break;
      }
      case "priceDown": {
        setSearchResult(arr.sort((a, b) => a.price - b.price));
        break;
      }
      default:
        return;
    }
  };

  const sortHandle = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setParams({
      ...(searchValue && { keywords: searchValue }),
      ...(value !== "" && { sortby: value }),
    });
    sortBy(value, searchResult);
  };

  useEffect(() => {
    const keywords = params.get("keywords");
    setSearchValue(keywords);
    sendData(keywords);
  }, []);

  return (
    <>
      <MainBlock
        headerValue="TÌM KIẾM"
        value={
          <form className="search" onSubmit={(e) => submitHandle(e)}>
            <div className="search-left">
              <i className="fa-solid fa-magnifying-glass"></i>
              Tìm kiếm
            </div>
            <div className="search-right">
              <input
                defaultValue={searchValue}
                type="text"
                placeholder="Nhập từ khóa!!"
                onChange={(e) => inputChangeHandle(e)}
              />
            </div>
            <div className="search-button" style={{ marginLeft: "20px" }}>
              <button className="btn">Tìm</button>
            </div>
          </form>
        }
      />

      {loading ? (
        <div className="loader"></div>
      ) : (
        <MainBlock
          headerValue="KẾT QUẢ"
          otherClass="search-result"
          headerRight={
            <select
              onChange={(e) => {
                sortHandle(e);
              }}
              defaultValue={params.get("sortby")}
            >
              <option value={""}>Lọc</option>
              <option value="priceUp">Giá giảm dần</option>
              <option value="priceDown">Giá tăng dần</option>
            </select>
          }
          value={
            <div className="card">
              {searchResult?.map((item, index) => {
                return <Item key={index} item={item} />;
              })}
              {searchResult.length === 0 && "Không có gì ở đây!"}
            </div>
          }
        />
      )}
    </>
  );
};

export default Search;
