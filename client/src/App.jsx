import React, { useState } from 'react';
import TreeNode from './components/TreeNode';
import { Box, Button, Center, Code } from '@chakra-ui/react';
import data from '../data.json'
const App = () => {

  const [treeData, setTreeData] = useState(data)
  const [exportData, setExportData] = useState("");

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
  const handleExport = () => {
    const exportedTree = JSON.stringify(treeData, ["name", "children", "data"], 2);
    setExportData(exportedTree);
  };
  return (
    <div>
      <Box m="2%">
      <TreeNode data={treeData} onAddChild={handleAddChild} />
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