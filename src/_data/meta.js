module.exports = {
	url: process.env.URL || 'http://localhost:8080',
	siteName: 'ecrosstexas.com',
	siteDescription:
	  'The personal website of Eric T. Wallace, a digital rancher in Plano, Texas.',
	siteType: 'Person', // schema
	locale: 'en_EN',
	lang: 'en',
	skipContent: 'Skip to content',
	author: {
	  name: 'Eric T. Wallace', // i.e. Lene Saile - page / blog author's name. Must be set.
	  avatar: '/favicon.png',
	  email: 'ecrosstexas@gmail.com', // i.e. hola@lenesaile.com - email of the author
	  website: 'https://www.ecrosstexas.com' // i.e. https.://www.lenesaile.com - the personal site of the author
	},
	creator: {
	  name: 'Eric T. Wallace', // i.e. Lene Saile - creator's (developer) name.
	  email: 'ecrosstexas@gmail.com',
	  website: 'https://www.ecrosstexas.com',
	  social: 'https://twitter.com/ecrosstexas'
	},
	themeColor: '#DD4462', //  Manifest: defines the default theme color for the application
	themeBgColor: '#FBFBFB', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
	opengraph_default: '/assets/images/template/opengraph-default.jpg', // fallback/default meta image
	opengraph_default_alt:
	  'Visible content: The personal website of Eric T. Wallace, a digital rancher in Plano, Texas.', // alt text for default meta image
	blog: {
	  // RSS feed
	  name: "Eric's Blog",
	  description:
		'Tell the word what you are writing about in your blog. It will show up on feed readers.',
    // feed links are looped over in the head. You may add more to the array.
    feedLinks: [
      {
        title: 'Atom Feed',
        url: '/feed.xml',
        type: 'application/atom+xml'
      }
    ],
    // Tags
    tagSingle: 'Tag',
    tagPlural: 'Tags',
    tagMore: 'More tags:',
    // pagination
    paginationLabel: 'Blog',
    paginationPage: 'Page',
    paginationPrevious: 'Previous',
    paginationNext: 'Next',
    paginationNumbers: true
  },
  details: {
    aria: 'section controls',
    expand: 'expand all',
    collapse: 'collapse all'
  },
  navigation: {
    ariaTop: 'Main',
    ariaBottom: 'Site',
    ariaPlatforms: 'Socials',
    // activate alternative mobile menu with drawer
    drawerNav: true,
    navLabel: 'Menu'
  },
  themeSwitch: {
    title: 'Theme',
    light: 'light',
    dark: 'dark',
    initial: 'select'
  },
  greenweb: {
    // this goues into src/common/greenweb.njk
    providers: {
      // if you want to add more than one, edit the array directly.
      domain: 'netlify.com',
      service: 'cdn'
    },
    credentials: {
      // optional, eg: 	{ domain='my-org.com', doctype = 'webpage', url = 'https://my-org.com/our-climate-record'}
      domain: '',
      doctype: '',
      url: ''
    }
  },
  viewRepo: {
    // this is for the view/edit on github link. The value in the package.json will be pulled in.
    allow: true,
    infoText: 'View this page on GitHub'
  },
  easteregg: true,

  //*** ADDED BY ECROSSTEXAS */
  siteFQDN: 'www.ecrosstexas.com',

  webmentions: {
    fallbackAvatar: '/assets/images/svg/avatar-fallback.svg',
    formTitle: 'Have you commented on this? Let me know where:',
    buttonValue: 'Send Webmention'
  },
};
