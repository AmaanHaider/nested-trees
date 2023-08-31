import React, { useState } from 'react';
import TreeNode from './components/TreeNode';
import { Box, Button, Center, Code } from '@chakra-ui/react';
import data from '../data.json'

const App = () => {
  const [treeData, setTreeData] = useState(data);
  const [exportData, setExportData] = useState("");

  const handleAddChild = (parentNode, newChild) => {
    const updatedTreeData = { ...treeData };
    
    const addNewChild = (node) => {
      if (node === parentNode) {
        if (!node.children) {
          node.children = [];
        }
        const childNode = { name: newChild, data: "Data" }; 
        node.children.push(childNode);
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

  const handleExport = () => {
    const exportedTree = JSON.stringify(treeData, null, 2);
    setExportData(exportedTree);
  };

  const handleDataChange = (parentNode, newData) => {
    const updatedTreeData = { ...treeData };

    const updateData = (node) => {
      if (node === parentNode) {
        node.data = newData;
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (updateData(child)) return true;
        }
      }
      return false;
    };

    updateData(updatedTreeData);
    setTreeData(updatedTreeData);
  };

  return (
    <div>
      <Box m="2%">
        <TreeNode data={treeData} onAddChild={handleAddChild} onDataChange={handleDataChange} />
        <Box marginTop="4%">
          <Center>
            <Button onClick={handleExport}>Export</Button>
          </Center>
          <Box mt="2">
            <Code children={exportData} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default App;
