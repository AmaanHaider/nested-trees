import React, { useState } from 'react';
import data from '../data.json';
import TreeNode from './components/TreeNode';

const App = () => {
  const [treeData, setTreeData] = useState(data);

  const handleAddChild = (parentNode, newChild) => {
    const updatedTreeData = { ...treeData };
    const addNewChild = (node) => {
      if (node === parentNode) {
        if (!node.children) {
          node.children = [];
        }
        node.children.push(newChild);
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (addNewChild(child)) return true;
        }
      }
      return false;
    };

    addNewChild(updatedTreeData);
    setTreeData(updatedTreeData);
  };

  return (
    <div>
      <TreeNode data={treeData} onAddChild={handleAddChild} />
    </div>
  );
};

export default App;
