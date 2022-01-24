import TreeView from './TreeView';
import { useState, useRef, useCallback } from 'react';
import debounce from './utils/debounce';
import { search } from './utils/helper';
import PropTypes, { object } from 'prop-types';

const TreeContainer = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const searchData = useRef(null);

  const searchTreeNode = (input, oldInputValue) => {
    const validInput = input && input.trim();
    if (validInput || oldInputValue) {
      if (!validInput && oldInputValue) {
        searchData.current = null;
        setSearchText('');
      } else {
        const inputLowerCase = input.toLowerCase();
        const filteredTexts = search(inputLowerCase, data);
        searchData.current = filteredTexts;
        setSearchText(input);
      }
    }
  }

  const debounceFunc = useCallback(debounce((input, searchText) => searchTreeNode(input, searchText), 500), []);

  const onHandleChange = e => {
    debounceFunc(e.target.value, searchText);
  };

  return (
    <div data-testid="tree-container">
      <input 
        type="text"  
        onChange={onHandleChange}
        className="custom-input" 
        placeholder="Enter Text..." />
      <TreeView 
        treeData={data} 
        searchData={searchData.current}
      />
    </div> 
  );
}

TreeContainer.propTypes = {
  data: PropTypes.arrayOf(object).isRequired
}

export default TreeContainer;
