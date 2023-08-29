
import React  from 'react';
import Tree from './components/Tree';


const App = () => {
  const treeData = {
    name: 'root',
    children: [
      {
        name: 'child1',
        children: [
          { name: 'child1-child1', data: "c1-c1 Hello" },
          { name: 'child1-child2', data: "c1-c2 JS" }
        ]
      },
      { name: 'child2', data: "c2 World" }
    ]
  };

  return (
      <div className="App">
        <Tree tree={treeData} />
      </div>
  );
};

export default App;
