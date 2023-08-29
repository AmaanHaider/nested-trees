import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Collapse, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const TreeNode = ({ node }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <VStack align="start" spacing={1}>
        <Box onClick={handleToggle} cursor="pointer">
          {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />} {node.name}
        </Box>
        <Collapse in={isOpen}>
          {node.children &&
            node.children.map((child) => (
              <div key={child.name} style={{ marginLeft: '20px' }}>
                <TreeNode node={child} />
              </div>
            ))}
        </Collapse>
      </VStack>
    );
  };
  
  
  
  export default TreeNode