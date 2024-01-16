import {useWindowDimensions} from 'react-native';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import TableRenderer, {tableModel} from '@native-html/table-plugin';

// Source: https://github.com/native-html/plugins/tree/master/packages/table-plugin#readme
const AnnouncementHTML = ({description}: {description: string}) => {
  const {width} = useWindowDimensions();
  const horizontalPadding = 16;
  const htmlContentWidth = width - horizontalPadding * 2;

  return (
    <HTML
      contentWidth={htmlContentWidth}
      source={{html: description}}
      WebView={WebView}
      renderers={{table: TableRenderer}}
      renderersProps={{table: {}}}
      customHTMLElementModels={{table: tableModel}}
    />
  );
};

export default AnnouncementHTML;
