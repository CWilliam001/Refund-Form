import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import { PDFDownloadLink, View, Document, Page, Text } from '@react-pdf/renderer';
import { styles } from './style/pdf-style';
import XLSX from 'xlsx';

function App() {
    const [showModal, setShowModal] = useState(false);
    const [refundData, setRefundData] = useState<any[]>([]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const fetchData = () => {
        fetch('refund/', {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
            const { refund_form } = data;
            setRefundData(refund_form);
        })
        .catch((e) => {
            console.error('Error while sending request: ', e);
        })
    }

    const RefundDocument = () => (
        <Document>
            <Page style={styles.page}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Refund To: EXXONMOBIL BUSINESS SUPPORT CENTRE MALAYSIA</Text>
                    <View style={styles.section}>
                    <View style={styles.row}>
                        <Text>TICKET NUMBER: XXX</Text>
                        <Text>REFUND NO: XXX</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>REFUND TYPE: XXX</Text>
                        <Text>INVOICE NO: XXX</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>REFUND CREATED DATE: XXX</Text>
                        <Text>TCID: XXX</Text>
                    </View>
                    </View>
                    <View style={styles.section}>
                    <Text style={styles.part}>PART (A)</Text>
                    <Text style={styles.attribute}>ATTRIBUTE</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                        <Text>AIR FARE (GROSS)</Text>
                        <Text style={styles.alignRight}>19,164.00</Text>
                        </View>
                        <View style={styles.tableRow}>
                        <Text>LESS COMMISSION</Text>
                        <Text style={styles.alignRight}>0.00</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.section}>
                    <Text>PART A & B TO BE COMPLETED BY TC</Text>
                    <Text>PART C FOR ACCOUNTS DEPT</Text>
                    <Text style={styles.remark}>REMARK:</Text>
                    <Text>BSP: P2 NOV 22</Text>
                    <View style={styles.signatureRow}>
                        <View style={styles.signatureCol}>
                        <Text>Prepared By:</Text>
                        <Text>name</Text>
                        <Text>date</Text>
                        </View>
                        <View style={styles.signatureCol}>
                        <Text>Checked By:</Text>
                        <Text>name</Text>
                        <Text>date</Text>
                        </View>
                    </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Container>
                {
                    refundData.length > 0 ? (
                        <div>
                            
                            {
                                refundData.map((refund) => (
                                    <div key={refund.rf_number}>
                                        <h4>Refund To: {refund.rf_custname}</h4>
                                        <Row>
                                            <Col>
                                                <div className="border p-4">
                                                <Row>
                                                    <Col>
                                                        <span className='fw-bold'>TICKET NUMBER: </span>{refund.rf_airno} {refund.rf_ticketno}
                                                    </Col>
                                                    <Col>
                                                    <span className='fw-bold'>REFUND NO: </span>{refund.rf_number}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span className='fw-bold'>REFUND TYPE: </span>{refund.rf_type}
                                                    </Col>
                                                    <Col>
                                                        <span className='fw-bold'>INVOICE NO: </span>{refund.rf_invcno}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span className='fw-bold'>REFUND CREATED DATE: </span>{refund.rf_date}
                                                    </Col>
                                                    <Col>
                                                        <span className='fw-bold'>TCID: </span>{refund.rf_userid}
                                                    </Col>
                                                </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className="border p-4">
                                                    <span className='fw-bold'>PART (A)</span><br />
                                                    <span className='fw-bold'>REFUND CALCULATION FROM AIRLINE</span>
                                                    <Table bordered hover responsive>
                                                        <tbody>
                                                            <tr>
                                                                <td className='fw-bold col-9'>AIR FARE (GROSS)</td>
                                                                <td className="text-end pe-4">{refund.rf_afgross}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: COMMISSION</td>
                                                                <td className="text-end pe-4">{refund.rf_commission}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='fw-bold'>AIR FARE (NETT)</td>
                                                                <td className="text-end pe-4">{refund.rf_afnett}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>ADD: TAXES</td>
                                                                <td className="text-end pe-4">{refund.rf_taxes}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>ADD: D8 GST TAXES</td>
                                                                <td className="text-end pe-4">{refund.rf_gsttax}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: GST ON COMM</td>
                                                                <td className="text-end pe-4">{refund.rf_gstcomm}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='fw-bold'>TOTAL:</td>
                                                                <td className='fw-bold text-end pe-4'>{refund.rf_total}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: PARTIALLY UTILISED AIR FARES</td>
                                                                <td className="text-end pe-4">{refund.rf_partiallyut}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: UTILISED TAXES</td>
                                                                <td className="text-end pe-4">{refund.rf_utilisedtax}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: UTILISED D8 GST TAXES</td>
                                                                <td className="text-end pe-4">{refund.rf_uitilisedgst}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: AIRLINE NO SHOW FEE</td>
                                                                <td className="text-end pe-4">{refund.rf_airnoshowfee}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: AIRLINE CANCELLATION FEE</td>
                                                                <td className="text-end pe-4">{refund.rf_aircancellation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: AIRLINE ADMIN/HANDLING FEE</td>
                                                                <td className="text-end pe-4">{refund.rf_airadminfee}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>ADJUSTMENT AMOUNT</td>
                                                                <td className="text-end pe-4">{refund.rf_adjustamt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='fw-bold'>TOTAL REFUND FROM AIRLINES</td>
                                                                <td className='fw-bold text-end pe-4'>{refund.rf_totalrefund}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Retain Mark Up</td>
                                                                <td className="text-end pe-4">{refund.rf_markup}</td>
                                                            </tr>
                                                        </tbody>
                                                        
                                                    </Table>
                                                    
                                                    <span className='fw-bold'>PART (B)</span><br />
                                                    <span className='fw-bold'>INVOICE</span>
                                                    <Table bordered hover responsive>
                                                        <tbody>
                                                            <tr>
                                                                <td className="col-9">AIR FARE</td>
                                                                <td className="text-end pe-4">{refund.rf_invairfare}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>MARK-UP (%)</td>
                                                                <td className="text-end pe-4">{refund.rf_invmarkup}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>TAXES</td>
                                                                <td className="text-end pe-4">{refund.rf_invtaxes}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>D8 TAXES</td>
                                                                <td className="text-end pe-4">{refund.rf_invd8tax}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>TRANSACTION FEE</td>
                                                                <td className="text-end pe-4">{refund.rf_invtransfee}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>AGENT COLLECTION FEE (ACF)</td>
                                                                <td className="text-end pe-4">{refund.rf_invagentfee}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>MERCHANT FEE (CC)</td>
                                                                <td className="text-end pe-4">{refund.rf_invmerchfee}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>AOHES</td>
                                                                <td className="text-end pe-4">{refund.rf_invcaohes}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='fw-bold'>TOTAL INVOICE AMOUNT</td>
                                                                <td className='fw-bold text-end pe-4'>{refund.rf_invtotalamt}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                    
                                                    <span className='fw-bold'>PART (c)</span><br />
                                                    <span className='fw-bold'>CREDIT NOTE</span>
                                                    <Table bordered hover responsive>
                                                        <tbody>
                                                            <tr>
                                                                <td className='col-9'>LESS: PARTIALLY UTILISED AIR FARES</td>
                                                                <td className="text-end pe-4">{refund.rf_cnpartiallyut}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: UTILISED TAXES</td>
                                                                <td className="text-end pe-4">{refund.rf_cnuttax}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: UTILISED D8 GST TAXES</td>
                                                                <td className="text-end pe-4">{refund.rf_cnutd8tax}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: AIRLINE NO SHOW FEE</td>
                                                                <td className="text-end pe-4">{refund.rf_cnnoshowfee}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: AIRLINE CANCELLATION FEE</td>
                                                                <td className="text-end pe-4">{refund.rf_cnaircancellation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: AIRLINE ADMIN/HANDLING FEE</td>
                                                                <td className="text-end pe-4">{refund.rf_cnadminfee}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: AGENT TICKET FEE (TRXN/MARK-UP)</td>
                                                                <td className="text-end pe-4">{refund.rf_cntrxn}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: AGENT COLLECTION FEE (ACF)</td>
                                                                <td className="text-end pe-4">{refund.rf_cnacf}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: OTHERS FEE</td>
                                                                <td className="text-end pe-4">{refund.rf_cnothersfee}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: AOHES</td>
                                                                <td className="text-end pe-4">{refund.rf_cnaohes}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>LESS: MISC CHARGES (ADDL)</td>
                                                                <td className="text-end pe-4">{refund.rf_cnmisc}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>RETURN MARK UP TO CUSTOMER</td>
                                                                <td className="text-end pe-4">{refund.rf_cnreturnmarkup}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='fw-bold'>TOTAL REFUND TO CUSTOMER - CREDIT NOTE</td>
                                                                <td className="text-end pe-4">{refund.rf_cntotalrefund}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>TAX INVOICE FOR REFUND FEES</td>
                                                                <td className="text-end pe-4">{refund.rf_cntaxinvc}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='fw-bold'>NET REFUND</td>
                                                                <td className="text-end pe-4">{refund.rf_cnnetrefund}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>PART A & B TO BE COMPLETED BY TC</span><br />
                                                <span>PART C FOR ACCOUNTS DEPT</span>

                                                <br /><br />
                                                <span className='fw-bold'>REMARK:</span>
                                                <p>
                                                    {refund.rf_remark}
                                                </p>

                                                <br /><br />
                                                <Row>
                                                    <Col>
                                                        <span className="fw-bold">Prepared By:</span><br />
                                                        <span>{refund.rf_preparedby}</span><br />
                                                        <span>{refund.rf_prepareddate}</span>
                                                    </Col>
                                                    <Col>
                                                        <span className="fw-bold">Checked By:</span><br />
                                                        <span>{refund.rf_checkedby}</span><br />
                                                        <span>{refund.rf_checkeddate}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                ))
                            }
                            <Button variant='outline-primary' className='my-4' onClick={handleShow}>Export</Button>
                        </div>
                    ) : (
                        <p>No data to display for Refund Form</p>
                    )
                }
                
            </Container>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Export</Modal.Title>
                </Modal.Header>
                <Modal.Body>Select the export format</Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-info'>
                        <PDFDownloadLink document={<RefundDocument />} className='text-decoration-none text-info' fileName="exported_pdf.pdf">
                            {({ blob, url, loading, error }) =>
                                loading ? 'Generating PDF...' : 'Export as PDF'
                            }
                        </PDFDownloadLink>
                    </Button>
                    <Button variant='outline-info'>XLSX</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default App
