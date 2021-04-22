import React from 'react'
import { TinaProvider, TinaCMS } from 'tinacms'
import { MarkdownFieldPlugin } from 'react-tinacms-editor'
import { HtmlFieldPlugin } from 'react-tinacms-editor'
import { DateFieldPlugin } from 'react-tinacms-date'
import { createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';
import { CreateBlogPlugin } from '../plugins/BlogCreator'
import DjangoMediaStore from "../plugins/djangoBackend/media-store";
import LogoutWidget from "../plugins/djangoBackend/logout";
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
    toolbar: true,
    enabled: false,
    sidebar: {
      position: 'overlay',
    },
    media: new DjangoMediaStore(),
    plugins:[LogoutWidget, HtmlFieldPlugin, MarkdownFieldPlugin, DateFieldPlugin, CreateBlogPlugin]
  })

  return (
    <TinaProvider cms={cms}>
        <MuiThemeProvider theme={theme}>
          <Component {...pageProps} />
        </MuiThemeProvider>
      </TinaProvider>
  )
}
export default MyApp
