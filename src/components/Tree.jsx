import React from 'react'
import { VStack } from '@chakra-ui/react';
import TreeNode from './TreeNode';


const Tree = ({ tree }) => {
    return (
        <VStack align="start" spacing={4}>
        <TreeNode node={tree} />
      </VStack>
    );
};
export default Tree