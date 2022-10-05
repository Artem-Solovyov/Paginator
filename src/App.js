import './App.css';
import {useEffect, useState} from "react";
import Paginator from "./Paginator/Paginator";

function App() {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [pageExample, setPageExample] = useState(3);

  const onClickPage = (page) => {
    setPage(page)
  }

  const onClickPageExample = (page) => {
    setPageExample(page)
  }
  useEffect(()=>{
    fetch(`https://reqres.in/api/users?page=${page}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setItems(data.data)
          setTotalPages(data.total_pages)
        });
  }, [page])
  return (
    <div className="App">
      {items && items.map(item=>{
        return (
            <div key={item.id}>
              <div>
                <img src={item.avatar} alt="avatar"/>
              </div>
              <div>{item.id}.{item.first_name} {item.last_name}</div>
              <div>{item.email}</div>
            </div>
        )
      })}
      <br/>
      <Paginator pagesCount={totalPages} currentPage={page}  onPageChanged={onClickPage} portionSize={2} />
      <hr/>
      <h1>Example</h1>
      <hr/>
      <Paginator pagesCount={30} currentPage={pageExample}  onPageChanged={onClickPageExample} portionSize={6} />
    </div>
  );
}

export default App;
