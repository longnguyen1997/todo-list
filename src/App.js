import React, { useState } from "react";
import {
  Grommet,
  Heading,
  Button,
  Box,
  Form,
  FormField,
  CheckBox
} from "grommet";
import Fade from "react-reveal/Fade";

const grommetTheme = {
  checkBox: {
    color: "#1e5799"
  }
};

const useStateWithLocalStorage = (localStorageKey, initialValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || initialValue
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);

  return [value, setValue];
};

function TodoItem(props) {
  const [checked, setChecked] = useStateWithLocalStorage(props.label, false);
  return (
    <CheckBox
      checked={checked}
      label={props.label}
      onChange={event => setChecked(event.target.checked)}
    />
  );
}

function App() {
  const [todoList, setTodoList] = useStateWithLocalStorage("todoList", []);

  return (
    <Grommet full theme={grommetTheme}>
      <Box
        fill
        background="white"
        round="medium"
        alignSelf="center"
        margin={{ top: "25px" }}
      >
        <Fade>
          {/* Header greeting */}
          <Fade top>
            <Box>
              <Heading level="1" alignSelf="center" size="large">
                To-do list
              </Heading>
            </Box>
          </Fade>
          {/* Start with a row-wise box for desktop mode */}
          {/* Form to add an item */}
          <Fade>
            <Box direction="row" align="center" justify="center">
              {/* Add to the list of outstanding items when submitted. */}
              <Form
                onSubmit={event => {
                  const todoItem = event.value.item;
                  if (todoItem !== undefined && !todoList.includes(todoItem)) {
                    setTodoList(todoList.concat([todoItem]));
                  }
                }}
              >
                <FormField name="item" label="Item" />
                <Button color="#1e5799" type="submit" label="Add" primary />
              </Form>
            </Box>
          </Fade>
          {/* List of TODO items */}
          <Box
            direction="column"
            align="center"
            justify="center"
            margin="large"
          >
            {todoList.map(item => (
              <Fade bottom>
                <Box margin="xsmall">{<TodoItem label={item} />}</Box>
              </Fade>
            ))}
          </Box>
        </Fade>
      </Box>
    </Grommet>
  );
}

export default App;
