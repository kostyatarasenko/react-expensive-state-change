import React, { useState, useTransition, useEffect } from 'react';

const App = () => {
  const [text, setText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Pushing huge array to state
    const largeArray = Array.from({ length: 20000 }, (_, index) => ({
      id: index,
      name: `Item ${index}`,
    }));

    setItems(largeArray);
  }, []);

  const performExpensiveCalculation = (text, items) => {
    // Expensive calculation, iterating array incrementally O(n)
    return items.filter((item) => item.name.includes(text));
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    startTransition(() => {
      // Perform list filtering in the background
      const newFilteredItems = performExpensiveCalculation(newText, items);
      setFilteredItems(newFilteredItems);
    });

    // Here we will see UI freezes:
    // const newFilteredItems = performExpensiveCalculation(newText, items);
    // setFilteredItems(newFilteredItems);
  };

  return (
    <div>
      <input value={text} onChange={handleChange} placeholder="Введите текст" />
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
