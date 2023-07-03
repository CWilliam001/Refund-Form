import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: '1cm',
    },
    container: {
      flex: 1,
    },
    heading: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: '0.5cm',
    },
    section: {
      marginBottom: '0.8cm',
    },
    row: {
      flexDirection: 'row',
      marginBottom: '0.3cm',
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
      width: '60%',
      marginBottom: '0.3cm',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '0.1cm',
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