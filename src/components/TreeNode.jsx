import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Collapse, Button, Input } from '@chakra-ui/react';

const TreeNode = ({ data, onAddChild }) => {
  const [isOpen, setIsOpen] = useState(data.children ? true : false);
  const [showAddChild, setShowAddChild] = useState(false); 
  const [newChildName, setNewChildName] = useState('New Child');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addChild = () => {
    setShowAddChild(true);
  };

  const handleAddChild = () => {
    if (!data.children) {
      data.children = [];
    }
    data.children.push({ name: newChildName, data: 'Empty' });
    onAddChild(data.name);
    setShowAddChild(false);
  };

  const handleNewChildNameChange = (event) => {
    setNewChildName(event.target.value);
  };

  return (
    <Box>
      <Box
        onClick={handleToggle}
        cursor="pointer"
        maxW={"full"}
        style={{
          display: 'flex',
          height: "60px",
          alignItems: 'center',
          backgroundColor: "#6cacef",
          marginBottom: '10px',
        }}
      >
        {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        <span style={{ marginLeft: '10px', flex: '1' }}>{data.name}</span>
        {showAddChild ? (
          <div style={{ padding: "20px" }}>
            <Input
              type="text"
              backgroundColor="white"
              value={newChildName}
              onChange={handleNewChildNameChange}
              placeholder="Child Name"
            />
            <Button size="sm" onClick={handleAddChild}>
              Add Child
            </Button>
          </div>
        ) : (
          <div>
            <Button size="sm" onClick={addChild}>
              Add Child
            </Button>
          </div>
        )}
      </Box>

      <Collapse in={isOpen}>
        {data.children ? (
          data.children.map((child) => (
            <div key={child.name} style={{ marginLeft: '20px' }}>
              <TreeNode data={child} onAddChild={onAddChild} />
            </div>
          ))
        ) : null}

        {data.data && (
          <div style={{ marginLeft: '20px' }}>
            <p>Data: {data.data}</p>
          </div>
        )}
      </Collapse>
    </Box>
  );
};

export default TreeNode;
