import React, { useState } from 'react';
import data from '../data.json';
import TreeNode from './components/TreeNode';
import { Box, Button, Center } from '@chakra-ui/react';

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
      <Box m="2%">
      <TreeNode data={treeData} onAddChild={handleAddChild} />
      <Box marginTop="4%">
        <Center>
          <Button>Export</Button>
        </Center>
      </Box>
      </Box>
    </div>
  );
};

export default App;