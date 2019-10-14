import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core'
import { textFieldStyles } from './Styles'
import useDebounce from './Hooks/useDebounce'
import { search } from './Services/Giphy'
import useInfiniteScroll from './Hooks/useInfiniteScroll'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const classes= textFieldStyles()
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const searchGiphy = async (value, clear) => {
    setIsSearching(true)
    search(skip, take, value).then(res => {
      setIsSearching(false);
      setSkip(skip+10)
      !clear ? setResults([...results, ...res]) : setResults([...res])
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchGiphy(debouncedSearchTerm, "clear")
    } else {
      setResults([]);
    }
  },[debouncedSearchTerm]);

  const doc = document
  useInfiniteScroll(searchGiphy, searchTerm, doc)
  return (
    <div id="screen" className="App">
      <header className="App-header">
        <TextField
          id="outlined-required"
          label="Search"
          placeholder="eg: South Park"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={searchTerm}
          onChange={(event)=>setSearchTerm(event.target.value)}
        />
      { results.map((result,i) => {
          return <div key={`${result.id,i}`}><img src={result.images.original.url} height="300"/></div>
        })
      }
      </header>
    </div>
  );
}

export default App;
