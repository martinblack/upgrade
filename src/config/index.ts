import AWS from 'aws-sdk'

export const WASABI_ENDPOINT = 'https://s3.eu-central-1.wasabisys.com/'
export const API_ENDPOINT = 'https://api.dev.1000cams.com/v1.0/'

export const configWasabiUpload = {
  endpoint: new AWS.Endpoint(WASABI_ENDPOINT),
  region: 'eu-central-1',
  accessKeyId: 'K4C7NB1ZRFVTHZ8TAYW1',
  secretAccessKey: 'EZKz0zcilhTVE0SRoMe5HL0nGYIynwb4ruXOkAO2',
  bucket: '1000cams-media',
}

export const FB_APP_ID = '543731973949711'
export const FB_APP_NAME = 'GetMoments'

export const GOOGLE_SIGNIN_WEB_CLIENT_ID =
  '130734831164-74qt07rkkeldb76l2g1ivq6t92tm8ca6.apps.googleusercontent.com'
