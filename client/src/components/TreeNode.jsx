import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Collapse, Button, Input, Center } from "@chakra-ui/react";

const TreeNode = ({ data, onAddChild, onDataChange }) => {
  const [isOpen, setIsOpen] = useState(data.children ? true : false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState("New Child");
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addChild = () => {
    setShowAddChild(true);
  };

  const handleAddChild = (parent, newChild) => {
    onAddChild(parent, newChild);
  };

  const handleNewChildNameChange = (event) => {
    setNewChildName(event.target.value);
  };

  const handleDataFieldChange = (event) => {
    const newData = event.target.value;
    onDataChange(data, newData); 
  };

  return (
    <Box>
      <Box
        onClick={handleToggle}
        cursor="pointer"
        maxW={"full"}
        style={{
          display: "flex",
          height: "60px",
          alignItems: "center",
          backgroundColor: "#6cacef",
          marginBottom: "10px",
        }}
      >
        {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        <span style={{ marginLeft: "10px", flex: "1" }}>{data.name}</span>
        {showAddChild ? (
          <div style={{ padding: "1%", height: "100%", display: "flex", gap: "2%" }}>
            <Input
              type="text"
              backgroundColor="white"
              value={newChildName}
              onChange={handleNewChildNameChange}
              placeholder="Type Child Name"
            />
            <Button size="sm" bg="#e6e6e5" onClick={() => handleAddChild(data, newChildName)}>
              Add Child
            </Button>
          </div>
        ) : (
          <div
            style={{
              margin: "10px",
            }}
          >
            <Button size="sm" bg="#e6e6e5" onClick={addChild}>
              Add Child
            </Button>
          </div>
        )}
      </Box>

      <Collapse
        in={isOpen}
        style={{
          border: "2px solid black",
          margin: "5px",
          padding: "0.5%",
        }}
      >
        {data.children
          ? data.children.map((child) => (
              <div key={child.name} style={{ marginLeft: "20px" }}>
                <TreeNode data={child} onAddChild={handleAddChild} onDataChange={onDataChange} />
              </div>
            ))
          : null}

        {data.data && (
          <div style={{ marginLeft: "20px" }}>
            <Box display="flex" gap="5">
              <Center>
                <p>Data:</p>
              </Center>
              <Input
                w="30%"
                value={data.data} 
                onChange={handleDataFieldChange} 
              />
            </Box>
          </div>
        )}
      </Collapse>
    </Box>
  );
};

export default TreeNode;
