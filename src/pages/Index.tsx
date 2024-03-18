import {
  VStack,
  HStack,
  Input,
  IconButton,
  useToast,
  Heading,
  Text,
  Box,
  Divider,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const toast = useToast();
  const inputBgColor = useColorModeValue('gray.100', 'gray.600');

  const addTodo = () => {
    if (!input) {
      toast({
        title: 'No content',
        description: "Todo can't be empty",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTodo = { id: Date.now(), text: input };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Box p={8}>
      <VStack spacing={8}>
        <Heading>Todo App</Heading>
        
        <HStack width="100%">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add your new todo"
            bg={inputBgColor}
          />
          <IconButton
            aria-label="Add todo"
            icon={<FaPlus />}
            onClick={addTodo}
          />
        </HStack>
        
        <VStack
          width="100%"
          borderWidth="1px"
          borderRadius="md"
          p={4}
          spacing={4}
          divider={<Divider />}
        >
          {todos.map((todo) => (
            <HStack key={todo.id} width="100%">
              <Text>{todo.text}</Text>
              <Spacer />
              <IconButton
                aria-label="Delete todo"
                icon={<FaTrash />}
                onClick={() => deleteTodo(todo.id)}
              />
            </HStack>
          ))}
          {todos.length === 0 && (
            <Text color="gray.500">No todos added yet</Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;