import './App.css';
// import TodoList from './components/TodoList/TodoList';
// import TodoForm from './components/TodoForm/TodoForm';
import { Container } from 'react-bootstrap';
import WeatherStackAPI from './Weather';

function App() {
  return (
    <Container>
        <WeatherStackAPI />
         {/* <Row>
            <Col md={3}>
              <TodoForm />
            </Col>
            <Col>
              <TodoList />
            </Col>
         </Row> */}
      </Container>
  );
}

export default App;
