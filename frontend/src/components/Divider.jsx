import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Divider(props) {
  return (
    <Row className={props.classNameOpts ? props.classNameOpts : undefined}>
      <Col className="pe-2">
        <hr />
      </Col>
      <Col className="d-flex align-items-center p-0" xs="auto">
        {props.text}
      </Col>
      <Col className="ps-2">
        <hr />
      </Col>
    </Row>
  );
}

Divider.propTypes = {
  text: PropTypes.string.isRequired,
  classNameOpts: PropTypes.string,
};
