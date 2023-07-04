import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import { PDFViewer, Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';
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
    
    // Generate PDF document
    const RefundDocument = () => (
        <Document>
            {
                refundData.map((refund) => (
                    <Page size={'A4'} key={refund.rf_number}>
                        <View style={styles.container}>
                            <Text style={styles.heading}>Refund To: {refund.rf_custname}</Text>
                            <View>
                                <View style={[styles.section, styles.border]}>
                                    <View style={styles.row}>
                                        <View style={styles.col}>
                                            <View style={styles.row}>
                                            <Text style={[styles.boldText, styles.text]}>TICKET NUMBER:</Text>
                                                <Text style={styles.text}>{refund.rf_airno} {refund.rf_ticketno}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={[styles.boldText, styles.text]}>REFUND TYPE:</Text>
                                                <Text style={styles.text}>{refund.rf_type}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={[styles.boldText, styles.text]}>REFUND CREATED DATE:</Text>
                                                <Text style={styles.text}>{refund.rf_date}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.col}>
                                            <View style={styles.row}>
                                                <Text style={[styles.boldText, styles.text]}>REFUND NO:</Text>
                                                <Text style={styles.text}>{refund.rf_number}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={[styles.boldText, styles.text]}>INVOICE NO:</Text>
                                                <Text style={styles.text}>{refund.rf_invcno}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={[styles.boldText, styles.text]}>TCID:</Text>
                                                <Text style={styles.text}>{refund.rf_userid}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    
                                </View>
                                <View style={[styles.section, styles.border]}>
                                    <View style={styles.row}>
                                        <View style={styles.col}>
                                            <Text style={[styles.boldText, styles.text]}>PART (A)</Text>
                                            <Text style={[styles.boldText, styles.text]}>REFUND CALCULATION FROM AIRLINE</Text>
                                            
                                            <View style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                    <Text style={[styles.boldText, styles.text]}>AIR FARE (GROSS)</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                    <Text style={styles.text}>{refund.rf_afgross}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: COMMISSION</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_commission}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={[styles.tableCell, styles.boldText]}>
                                                        <Text style={styles.text}>AIR FARE (NETT)</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_afnett}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>ADD: TAXES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_taxes}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>ADD: D8 GST TAXES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_gsttax}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: GST ON COMM</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_gstcomm}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={[styles.tableCell, styles.boldText]}>
                                                        <Text style={styles.text}>TOTAL:</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_total}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: PARTIALLY UTILISED AIR FARES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_partiallyut}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: UTILISED TAXES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_utilisedtax}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: UTILISED D8 GST TAXES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_uitilisedgst}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: AIRLINE NO SHOW FEE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_airnoshowfee}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: AIRLINE CANCELLATION FEE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_aircancellation}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: AIRLINE ADMIN/HANDLING FEE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_airadminfee}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>ADJUSTMENT AMOUNT</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_adjustamt}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={[styles.tableCell, styles.boldText]}>
                                                        <Text style={styles.text}>TOTAL REFUND FROM AIRLINES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_totalrefund}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>Retain Mark Up</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_markup}</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <Text style={[styles.boldText, styles.text]}>PART (B)</Text>
                                            <Text style={[styles.boldText, styles.text]}>INVOICE</Text>

                                            <View style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>AIR FARE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_invairfare}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>MARK-UP (%)</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_invmarkup}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>TAXES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_invtaxes}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>D8 TAXES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_invd8tax}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>TRANSACTION FEE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_invtransfee}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>AGENT COLLECTION FEE (ACF)</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_invagentfee}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>MERCHANT FEE (CC)</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_invmerchfee}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>AOHES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_invcaohes}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={[styles.tableCell, styles.boldText]}>
                                                        <Text style={styles.text}>TOTAL INVOICE AMOUNT</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_invtotalamt}</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <Text style={[styles.boldText, styles.text]}>PART (C)</Text>
                                            <Text style={[styles.boldText, styles.text]}>CREDIT NOTE</Text>

                                            <View style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: PARTIALLY UTILISED AIR FARES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnpartiallyut}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: UTILISED TAXES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnuttax}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: UTILISED D8 GST TAXES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnutd8tax}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: AIRLINE NO SHOW FEE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnnoshowfee}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: AIRLINE CANCELLATION FEE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnaircancellation}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: AIRLINE ADMIN/HANDLING FEE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnadminfee}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: AGENT TICKET FEE (TRXN/MARK-UP)</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cntrxn}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: AGENT COLLECTION FEE (ACF)</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnacf}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: OTHERS FEE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnothersfee}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: AOHES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnaohes}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>LESS: MISC CHARGES (ADDL)</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnmisc}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>RETURN MARK UP TO CUSTOMER</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnreturnmarkup}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={[styles.tableCell, styles.boldText]}>
                                                        <Text style={styles.text}>TOTAL REFUND TO CUSTOMER - CREDIT NOTE</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cntotalrefund}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>TAX INVOICE FOR REFUND FEES</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cntaxinvc}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <View style={[styles.tableCell, styles.boldText]}>
                                                        <Text style={styles.text}>NET REFUND</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.text}>{refund.rf_cnnetrefund}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.section}>
                                    <View style={styles.row}>
                                        <View style={styles.col}>
                                            <Text style={styles.text}>PART A & B TO BE COMPLETED BY TC</Text>
                                            <Text style={styles.text}>PART C FOR ACCOUNTS DEPT</Text>
                                            <Text style={[styles.boldText, styles.text]}>REMARK:</Text>
                                            <Text style={styles.text}>{refund.rf_remark}</Text>
                                            <View style={styles.row}>
                                                <View style={styles.col}>
                                                    <Text style={[styles.boldText, styles.text]}>Prepared By:</Text>
                                                    <Text style={styles.text}>{refund.rf_preparedby}</Text>
                                                    <Text style={styles.text}>{refund.rf_prepareddate}</Text>
                                                </View>
                                                <View style={styles.col}>
                                                    <Text style={[styles.boldText, styles.text]}>Checked By:</Text>
                                                    <Text style={styles.text}>{refund.rf_checkedby}</Text>
                                                    <Text style={styles.text}>{refund.rf_checkeddate}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                
                            </View>
                        </View>
                    </Page>
                ))
            }
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
                            <div>
                                <PDFViewer style={styles.pageView}>
                                    <RefundDocument />
                                </PDFViewer>
                            </div>
                            
                            {
                                refundData.map((refund) => (
                                    <div key={refund.rf_number}>
                                        <h4 className='ps-4'>Refund To: {refund.rf_custname}</h4>
                                        <Row>
                                            <Col>
                                                <div className="border p-4">
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col md={4}><span className='fw-bold'>TICKET NUMBER: </span></Col>
                                                                <Col>{refund.rf_airno} {refund.rf_ticketno}</Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={4}><span className='fw-bold'>REFUND TYPE: </span></Col>
                                                                <Col>{refund.rf_type}</Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={4}><span className='fw-bold'>REFUND CREATED DATE: </span></Col>
                                                                <Col>{refund.rf_date}</Col>
                                                            </Row>
                                                        </Col>
                                                        <Col>
                                                            <Row>
                                                                <Col md={4}><span className='fw-bold'>REFUND NO: </span></Col>
                                                                <Col>{refund.rf_number}</Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={4}><span className='fw-bold'>INVOICE NO: </span></Col>
                                                                <Col>{refund.rf_invcno}</Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={4}><span className='fw-bold'>TCID: </span></Col>
                                                                <Col>{refund.rf_userid}</Col>
                                                            </Row>
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
