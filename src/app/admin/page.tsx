import React from 'react';
import './page.css';
import Vue from 'vue';

const VueAdminPage = () => {
  // return (
  //   <div>
  //     <iframe
  //       title="Vue Admin Template"
  //       src="../../../public/src/index.html"
  //       width="100%"
  //       height="700px"
  //       frameBorder="0"
  //     ></iframe>
  //   </div>
  // );

  const templateHTML = `<div>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,shrink-to-fit=no">
    <meta name="description" content="CoreUI Vue.js Admin Template">
    <meta name="author" content="creativeLabs Łukasz Holeczek">
    <title>CoreUI Vue.js Admin Template</title>
    <!-- favicons for all devices -->
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <script>
      const userMode = localStorage.getItem('coreui-free-vue-admin-template-theme');
	    const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (userMode === 'dark' || (userMode !== 'light' && systemDarkMode)) {
				document.documentElement.dataset.coreuiTheme = 'dark';
			}
    </script>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but this app doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <script type="module" src="../../../public/src/main.js"></script>
    <!-- built files will be auto injected -->
  </body>
</div>`;

  return (
    <div dangerouslySetInnerHTML={{ __html:templateHTML}} />
  )
};

export default VueAdminPage;