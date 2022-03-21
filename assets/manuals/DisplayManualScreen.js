import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import PdfView from 'react-native-view-pdf';

const resources = {
  url: 'https://firebasestorage.googleapis.com/v0/b/rnchat-1.appspot.com/o/manuals%2FDisplayManual.pdf?alt=media&token=418857a3-2b5a-43d4-aa3c-4e146a5cb86b',
};


export default class DisplayManualScreen extends Component {
    static navigationOptions = { 
      title: 'PDF'
    };
    
    render() {
      console.log("I am in pdf");
      // const source = require('./DisplayManual.pdf');
      const resourceType = 'url';
      return <PdfView
                style={{ flex: 1 }}
                resource={resources[resourceType]}
                resourceType={resourceType}
                onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                onError={(error) => console.log('Cannot render PDF', error)}
              />;
    }
}

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width
    }
});