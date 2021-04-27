import React from 'react'
import { TinaProvider, TinaCMS } from 'tinacms'
import { MarkdownFieldPlugin } from 'react-tinacms-editor'
import { HtmlFieldPlugin } from 'react-tinacms-editor'
import { DateFieldPlugin } from 'react-tinacms-date'
import { createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';
import { CreateBlogPlugin } from '../plugins/BlogCreator'
import DjangoMediaStore from "../plugins/djangoBackend/media-store";
import LogoutWidget from "../plugins/djangoBackend/logout";
import TinaCMSConditionField from 'tinacms-condition-field'
import { ConditionalFieldPlugin, ConditionalGroupFieldPlugin } from 'react-tinacms-field-condition'


const MyApp = ({ Component, pageProps }) =>{

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1F2142'
      },
      secondary: {
        main: '#EB826C'
      },
      
    },
  });
  const cms = new TinaCMS({
    toolbar: false,
    enabled: false,
    sidebar: {
      position: 'displace',
    },
    media: new DjangoMediaStore(),
    plugins:[LogoutWidget, HtmlFieldPlugin, MarkdownFieldPlugin, DateFieldPlugin, CreateBlogPlugin, ConditionalFieldPlugin, ConditionalGroupFieldPlugin]
  })
  /*
  const conditionField = new TinaCMSConditionField(cms);
 
  conditionField.install();
  */
  return (
    <TinaProvider cms={cms}>
        <MuiThemeProvider theme={theme}>
          <Component {...pageProps} />
        </MuiThemeProvider>
      </TinaProvider>
  )
}
export default MyApp
