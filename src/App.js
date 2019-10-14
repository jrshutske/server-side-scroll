import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core'
import { useTextFieldStyles, useProgressBarStyles } from './Styles'
import useDebounce from './Hooks/useDebounce'
import { search } from './Services/Giphy'
import useInfiniteScroll from './Hooks/useInfiniteScroll'
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [skip, setSkip] = useState(0)
  const textFieldStyles = useTextFieldStyles()
  const progressBarStyles = useProgressBarStyles()
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const take = 10

  useEffect(() => setSkip(0), [searchTerm])

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSkip(0)
      searchGiphy(debouncedSearchTerm, "clear")
    } else {
      setResults([]);
    }
  },[debouncedSearchTerm]);

  const searchGiphy = (value, clear) => {
    setIsSearching(true)
    search(skip, take, value).then(res => {
      setIsSearching(false);
      setSkip(skip + 10)
      !clear ? setResults([...results, ...res]) : setResults([...res])
    });
  };
  useInfiniteScroll(searchGiphy, searchTerm, document)

  return (
    <div id="screen" className="App">
      <header className="App-header">
        <TextField
          id="outlined-required"
          label="Search"
          placeholder="eg: South Park"
          className={textFieldStyles.textField}
          margin="normal"
          variant="outlined"
          value={searchTerm}
          onChange={(event)=>{ setSearchTerm(event.target.value);  }}
        />
        {isSearching && <CircularProgress className={progressBarStyles.progress} color="secondary" />}
        { results.map((result,i) => {
            return <div key={`${result.id + i}`}><img src={result.images.original.url} alt="images from giphy" height="300"/></div>
          })
        }
      </header>
    </div>
  );
}

export default App;
