import './App.css';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import { Container, Row, Col } from 'react-bootstrap';
import WeatherStackAPI from './Weather';

function App() {
  return (
    <Container>
         <Row>
            <Col md={3}>
              <TodoForm />
              <WeatherStackAPI />
            </Col>
            <Col>
              <TodoList />
            </Col>
         </Row>
      </Container>
  );
}

export default App;
