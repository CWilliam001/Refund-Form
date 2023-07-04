import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        width: '595.28pt',
        height: '841.89pt',
        padding: '10', // Add padding if needed
    },
    pageView: {
        width: '100%',
        height: '800px'
    },
    border: {
      borderWidth: 1,
      borderColor: '#000000',
      padding: 8,
    },
    container: {
        flex: 1,
        width: '100%',
        padding: '3%'
    },
    heading: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: '0.5cm',
    },
    section: {
        marginBottom: '0',
    },
    row: {
        flexDirection: 'row',
        marginBottom: '2',
    },
    col: {
      flex: 1,
    },
    part: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: '0.3cm',
    },
    attribute: {
        fontSize: 12,
        marginBottom: '0.3cm',
    },
    table: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        padding: 1,
        borderBottomWidth: 1,
        borderColor: '#000000',
    },
    tableHeaderCell: {
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#f2f2f2',
    },
    text: {
        fontSize: 8,
    },
    boldText: {
        fontWeight: 'bold',
    },
    alignRight: {
        textAlign: 'right',
    },
    remark: {
        fontWeight: 'bold',
        marginBottom: '0.3cm',
    },
    signatureRow: {
        flexDirection: 'row',
    },
    signatureCol: {
        flex: 1,
    },
});