import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../client/components/Loading/Loading';
import { PdfContext } from './context/pdf-context';

const helpPage = () => {
  const [loading] = useContext(PdfContext);
  return (<>
    {loading ? (<Loading/>) : (
      <>
        <div>
          <Row>
            <Col md={{ span: 5, offset: 3 }}>
              <h2>
                How do I use the Ombudsman Toolbox?
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis est et ornare maximus. Morbi mattis, tellus maximus elementum mollis, magna sapien dictum ante, blandit aliquet neque sapien sit amet nulla. Vestibulum faucibus lorem non nulla lacinia, eu iaculis turpis sollicitudin. Nunc eget elit laoreet, malesuada risus quis, mollis leo. Nam sit amet sollicitudin elit. Integer est neque, scelerisque vel sem at, fringilla placerat ex. Nam cursus tortor sed diam tincidunt interdum.
              </p>
              <h2>
                Keep in Mind...
              </h2>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis est et ornare maximus. Morbi mattis, tellus maximus elementum mollis, magna sapien dictum ante, blandit aliquet neque sapien sit amet nulla.
                </li>
              </ul>
            </Col>
          </Row>
        </div>
        </>
      )}
  </>)};

export default helpPage;

// If we replace the URL with https://firebasestorage.googleapis.com/v0/b/ombudsman-a8077.appspot.com/o/LTCO%20Program%2FOlder%20Americans%20Act%20(Federal%20Law).pdf?alt=media&token=99424932-4bab-4ef2-b1ad-1abfa9dd785a or even after putting it in encodeURI() it doesn't render for some reason

export default PdfComponent;
