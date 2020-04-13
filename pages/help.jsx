import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../client/components/Loading/Loading';
import { PdfContext } from './context/pdf-context';

const HelpPage = () => {
  const [loading] = useContext(PdfContext);
  return (
    <>
      {loading ? (<Loading />) : (
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
    </>
);
};

export default HelpPage;
