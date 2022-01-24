import TreeItem from './TreeItem';
import PropTypes from 'prop-types';

const TreeView = ({ treeData, searchData }) => {
  const getFilterData = (treeData, searchData) => {
    return treeData.map(({ title, url, children }) => {
      return (
        <TreeItem 
          showElement={searchData ? searchData[`${title}-${url}`] : true}
          key={`${title}-${url}`} 
          title={title} 
          url={url} 
          children={children}
          searchData={searchData} />
      )
    })
  }
  
  return (
    <ol className={'ul-custom'}>
      {getFilterData(treeData, searchData)}
    </ol>  
  )
}

TreeView.propTypes = {
  treeData: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchData: PropTypes.object
}

export default TreeView;
