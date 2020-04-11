import React, {useContext, useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Loading from '../client/components/Loading/Loading';
import Table from 'react-bootstrap/Table'
import Link from 'next/link'

import { PdfContext } from './context/pdf-context';
import urls from '../utils/urls';

const editHelpPage = () => {
	const [loading, pdfs, categories, sortedPdfs] = useContext(PdfContext);
	const [checked, setCheck] = useState([]);
	const [filteredPdfs, setFilteredPdfs] = useState(sortedPdfs);

	useEffect(() => {
    if (!loading) setCheck(new Array(categories.length).fill(1));
	}, [loading]);
	
	useEffect(() => {
		let filtered = [];
		checked.map((item, index) => {
			if (item === 1) filtered = filtered.concat(pdfs[categories[index]]);
		});
		setFilteredPdfs(filtered);
	}, [checked])

  return (<>
    {loading ? (<Loading />)
      : (
        <div>
			<Row>
				<Col>
					<h1 align="center">HELP PAGE PREVIEW
					<Link href={urls.pages.add}>
						<button type="button" className="ml-5 btn btn-primary">Edit</button>
					</Link> {/* when clicked, box containing help text is empty and editable */}
					</h1>
					<div className="card card-block" align="center">
						{/* text from the help page */}
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
					</div>
					{/* <Row align="right">
					  <Col className="mt-5">
						<Button variant="light">Cancel</Button>
						<Button variant="primary">Submit</Button>
					  </Col>
					</Row> for editable text*/}
				</Col>
            </Row>
        </div>
      )}
  </>);
};

export default editHelpPage;
