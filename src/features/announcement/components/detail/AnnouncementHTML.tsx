import TableRenderer from '@native-html/table-plugin';
import {useWindowDimensions} from 'react-native';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';

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
      // 에러 해결을 위한 코드(Reference: https://github.com/uoslife/rebuild-client/pull/304)
      renderersProps={{
        table: {
          webViewProps: {
            style: {opacity: 0.99},
          },
        },
      }}
    />
  );
};

export default AnnouncementHTML;
