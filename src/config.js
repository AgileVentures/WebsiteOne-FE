const config = {
  production: {
    AUTH_API: 'https://develop.websiteone.agileventures.org/login',
    APP_URL: 'https://www.agileventures.org/',
    API_BASE_URL: 'https://develop.websiteone.agileventures.org/'
  },
  staging: {
    AUTH_API: 'https://staging.websiteone.agileventures.org/login',
    APP_URL: 'https://staging.websiteone.agileventures.org/',
    API_BASE_URL: 'https://staging.websiteone.agileventures.org/'
  },
  development: {
    AUTH_API: 'http://localhost:3000/login',
    APP_URL: `http://localhost:${process.env.PORT}/`,
    API_BASE_URL: 'http://localhost:3000'
  },
  testing: {
    AUTH_API: '', // Todo add url for testing,
    APP_URL: '', // Todo add url for testing,
    API_BASE_URL: '' // Todo add url for testing,
  }
}

export default config[process.env.NODE_ENV || 'development']
