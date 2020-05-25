import React from 'react';
import './App.css';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}

const App = () => {
  const initialStories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');
  const [stories, setStories] = React.useState(initialStories)

  const handleSearch = event => setSearchTerm(event.target.value)
  const handleRemoveStory = item => setStories(stories.filter(story => story.objectID !== item.objectID))

  const searchedStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <h1>My Hacker Stories</h1>
      <InputWithLabel id='search' value={searchTerm} onInputChange={handleSearch}
        isFocused
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List stories={searchedStories} onRemoveItem={handleRemoveStory} />
    </>
  );
}

const InputWithLabel = ({ id, value, type = 'text', onInputChange, isFocused, children }) => {
  const inputRef = React.useRef()

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input ref={inputRef} id={id} type={type} value={value} onChange={onInputChange} />
    </>
  )
}

const List = ({ stories, onRemoveItem }) =>
  <ul>
    {stories.map(item =>
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    )}
  </ul>

const Item = ({ item, onRemoveItem }) =>
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>&nbsp;
    <span>{item.author}</span>&nbsp;
    <span>{item.num_comments}</span>&nbsp;
    <span>{item.points}</span>&nbsp;
    <span>
      <button type='button' onClick={() => onRemoveItem(item)}>Dismiss</button>
    </span>
  </li>

export default App;
