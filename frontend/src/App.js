import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import QuestContainer from './containers/QuestContainer';
import WorldNav from './containers/WorldNav';

function App() {
  return (
    <div>
      <WorldNav />
      <Container fluid>
        <Row>
          <Col className='bg-primary' md={{span: 3, offset: 0}} >
            <h1>toggle</h1>
          </Col>
          <Col md={{span: 3, offset: 9}}>
            <QuestContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
