import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Collapse, Button, Input, Center } from '@chakra-ui/react';

const TreeNode = ({ data, onAddChild, onUpdateData, onUpdateParentName }) => {
  const [isOpen, setIsOpen] = useState(data.children ? true : false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('New Child');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(data.name);

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
    data.children.push({ name: newChildName, data: 'Data' });
    onAddChild(data.name);
    setShowAddChild(false);
  };

  const handleNewChildNameChange = (event) => {
    setNewChildName(event.target.value);
  };

  const handleStartEditingName = () => {
    setIsEditingName(true);
  };

  const handleEditNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleSaveName = () => {
    setIsEditingName(false);
    data.name = editedName;
    onUpdateParentName(data.name);
  };

  const handleDataChange = (event) => {
    const newData = event.target.value;
    data.data = newData;
    onUpdateData(data);
  };

  return (
    <Box>
      <Box
        cursor="pointer"
        maxW="full"
        style={{
          display: 'flex',
          height: '60px',
          alignItems: 'center',
          backgroundColor: '#6cacef',
          marginBottom: '10px',
        }}
      >
        <div
          onClick={handleToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          {isOpen ? (
            <Button  bg="#e6e6e5" ml="4" onClick={handleToggle}>
              <ChevronDownIcon  />
            </Button>
          ) : (
            <Button bg="#e6e6e5" ml="4" onClick={handleToggle}>

              <ChevronRightIcon  />
            </Button>
          )}
        </div>
        {isEditingName ? (
          <Input
            type="text"
            backgroundColor="white"
            value={editedName}
            onChange={handleEditNameChange}
            onBlur={handleSaveName}
            autoFocus
          />
        ) : (
          <span
            style={{
              marginLeft: '10px',
              flex: '1',
              cursor: 'pointer',
            }}
            onClick={handleStartEditingName}
          >
            {data.name}
          </span>
        )}

        {showAddChild ? (
          <div style={{ padding: '1%', height: '100%', display: 'flex', gap: '2%' }}>
            <Input
              type="text"
              backgroundColor="white"
              value={newChildName}
              onChange={handleNewChildNameChange}
              placeholder="Type Child Name"
            />
            <Button size="sm" bg="#e6e6e5" onClick={handleAddChild}>
              Add Child
            </Button>
          </div>
        ) : (
          <div style={{ margin: '10px' }}>
            <Button size="sm" bg="#e6e6e5" onClick={addChild}>
              Add Child
            </Button>
          </div>
        )}
      </Box>

      <Collapse
        in={isOpen}
        style={{
          border: '2px solid black',
          margin: '5px',
          padding: '0.5%',
        }}
      >
        {data.children
          ? data.children.map((child) => (
              <div key={child.name} style={{ marginLeft: '20px' }}>
                <TreeNode
                  data={child}
                  onAddChild={onAddChild}
                  onUpdateData={onUpdateData}
                  onUpdateParentName={onUpdateParentName}
                />
              </div>
            ))
          : null}

        {data.data && (
          <div style={{ marginLeft: '20px' }}>
            <Box display="flex" gap="5">
              <Center>
                <p>Data : </p>
              </Center>
              <Input
                w="30%"
                value={data.data}
                onChange={handleDataChange}
              />
            </Box>
          </div>
        )}
      </Collapse>
    </Box>
  );
};

export default TreeNode;
