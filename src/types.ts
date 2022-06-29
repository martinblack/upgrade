export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /** File field */
  FileUrl: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /**
   * The `Time` scalar type represents a Time value as
   * specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Time: any;
  /**
   * Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
};

export type AudioNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type AudioObjectType = AudioNode & {
  __typename?: 'AudioObjectType';
  created: Scalars['DateTime'];
  /** Marks a trashed item */
  deceased: Scalars['Boolean'];
  events: EventObjectTypeConnection;
  /** Path to the audio file */
  file: Scalars['String'];
  /** Format of the audio file */
  format?: Maybe<MediaAudioFormatChoices>;
  /** The ID of the object */
  id: Scalars['ID'];
  /** Track length */
  length?: Maybe<Scalars['Time']>;
  mediaitemPtr: MediaObjectType;
  /** Optional JSON Meta-Data */
  metaData?: Maybe<Scalars['JSONString']>;
  modified: Scalars['DateTime'];
  /** Name of the track */
  name: Scalars['String'];
  /** Owner of the item */
  owner: UserType;
  thumb?: Maybe<Scalars['FileUrl']>;
  /** Height of the thumbnail */
  thumbHeight: Scalars['Int'];
  /** Width of the thumbnail */
  thumbWidth: Scalars['Int'];
  videoCuts: VideoCutObjectTypeConnection;
};


export type AudioObjectTypeEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type AudioObjectTypeVideoCutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type AudioObjectTypeConnection = {
  __typename?: 'AudioObjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AudioObjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `AudioObjectType` and its cursor. */
export type AudioObjectTypeEdge = {
  __typename?: 'AudioObjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<AudioObjectType>;
};

/** DEPRECATED! Use CreateUserVideo */
export type CreateMyVideo = {
  __typename?: 'CreateMyVideo';
  userVideo?: Maybe<UserVideoObjectType>;
};

/** Creates a user video for given Event */
export type CreateUserVideo = {
  __typename?: 'CreateUserVideo';
  userVideo?: Maybe<UserVideoObjectType>;
};

/** Creates a video chunk for given UserVideo */
export type CreateVideoChunk = {
  __typename?: 'CreateVideoChunk';
  videoChunk?: Maybe<VideoChunkObjectType>;
};

/** Creates a video preview for given UserVideo */
export type CreateVideoPreview = {
  __typename?: 'CreateVideoPreview';
  videoPreview?: Maybe<VideoPreviewObjectType>;
};

/** An enumeration. */
export enum EventEventCountryChoices {
  /** Andorra */
  Ad = 'AD',
  /** United Arab Emirates */
  Ae = 'AE',
  /** Afghanistan */
  Af = 'AF',
  /** Antigua and Barbuda */
  Ag = 'AG',
  /** Anguilla */
  Ai = 'AI',
  /** Albania */
  Al = 'AL',
  /** Armenia */
  Am = 'AM',
  /** Angola */
  Ao = 'AO',
  /** Antarctica */
  Aq = 'AQ',
  /** Argentina */
  Ar = 'AR',
  /** American Samoa */
  As = 'AS',
  /** Austria */
  At = 'AT',
  /** Australia */
  Au = 'AU',
  /** Aruba */
  Aw = 'AW',
  /** Åland Islands */
  Ax = 'AX',
  /** Azerbaijan */
  Az = 'AZ',
  /** Bosnia and Herzegovina */
  Ba = 'BA',
  /** Barbados */
  Bb = 'BB',
  /** Bangladesh */
  Bd = 'BD',
  /** Belgium */
  Be = 'BE',
  /** Burkina Faso */
  Bf = 'BF',
  /** Bulgaria */
  Bg = 'BG',
  /** Bahrain */
  Bh = 'BH',
  /** Burundi */
  Bi = 'BI',
  /** Benin */
  Bj = 'BJ',
  /** Saint Barthélemy */
  Bl = 'BL',
  /** Bermuda */
  Bm = 'BM',
  /** Brunei */
  Bn = 'BN',
  /** Bolivia */
  Bo = 'BO',
  /** Bonaire, Sint Eustatius and Saba */
  Bq = 'BQ',
  /** Brazil */
  Br = 'BR',
  /** Bahamas */
  Bs = 'BS',
  /** Bhutan */
  Bt = 'BT',
  /** Bouvet Island */
  Bv = 'BV',
  /** Botswana */
  Bw = 'BW',
  /** Belarus */
  By = 'BY',
  /** Belize */
  Bz = 'BZ',
  /** Canada */
  Ca = 'CA',
  /** Cocos (Keeling) Islands */
  Cc = 'CC',
  /** Congo (the Democratic Republic of the) */
  Cd = 'CD',
  /** Central African Republic */
  Cf = 'CF',
  /** Congo */
  Cg = 'CG',
  /** Switzerland */
  Ch = 'CH',
  /** Côte d'Ivoire */
  Ci = 'CI',
  /** Cook Islands */
  Ck = 'CK',
  /** Chile */
  Cl = 'CL',
  /** Cameroon */
  Cm = 'CM',
  /** China */
  Cn = 'CN',
  /** Colombia */
  Co = 'CO',
  /** Costa Rica */
  Cr = 'CR',
  /** Cuba */
  Cu = 'CU',
  /** Cabo Verde */
  Cv = 'CV',
  /** Curaçao */
  Cw = 'CW',
  /** Christmas Island */
  Cx = 'CX',
  /** Cyprus */
  Cy = 'CY',
  /** Czechia */
  Cz = 'CZ',
  /** Germany */
  De = 'DE',
  /** Djibouti */
  Dj = 'DJ',
  /** Denmark */
  Dk = 'DK',
  /** Dominica */
  Dm = 'DM',
  /** Dominican Republic */
  Do = 'DO',
  /** Algeria */
  Dz = 'DZ',
  /** Ecuador */
  Ec = 'EC',
  /** Estonia */
  Ee = 'EE',
  /** Egypt */
  Eg = 'EG',
  /** Western Sahara */
  Eh = 'EH',
  /** Eritrea */
  Er = 'ER',
  /** Spain */
  Es = 'ES',
  /** Ethiopia */
  Et = 'ET',
  /** Finland */
  Fi = 'FI',
  /** Fiji */
  Fj = 'FJ',
  /** Falkland Islands (Malvinas) */
  Fk = 'FK',
  /** Micronesia (Federated States of) */
  Fm = 'FM',
  /** Faroe Islands */
  Fo = 'FO',
  /** France */
  Fr = 'FR',
  /** Gabon */
  Ga = 'GA',
  /** United Kingdom */
  Gb = 'GB',
  /** Grenada */
  Gd = 'GD',
  /** Georgia */
  Ge = 'GE',
  /** French Guiana */
  Gf = 'GF',
  /** Guernsey */
  Gg = 'GG',
  /** Ghana */
  Gh = 'GH',
  /** Gibraltar */
  Gi = 'GI',
  /** Greenland */
  Gl = 'GL',
  /** Gambia */
  Gm = 'GM',
  /** Guinea */
  Gn = 'GN',
  /** Guadeloupe */
  Gp = 'GP',
  /** Equatorial Guinea */
  Gq = 'GQ',
  /** Greece */
  Gr = 'GR',
  /** South Georgia and the South Sandwich Islands */
  Gs = 'GS',
  /** Guatemala */
  Gt = 'GT',
  /** Guam */
  Gu = 'GU',
  /** Guinea-Bissau */
  Gw = 'GW',
  /** Guyana */
  Gy = 'GY',
  /** Hong Kong */
  Hk = 'HK',
  /** Heard Island and McDonald Islands */
  Hm = 'HM',
  /** Honduras */
  Hn = 'HN',
  /** Croatia */
  Hr = 'HR',
  /** Haiti */
  Ht = 'HT',
  /** Hungary */
  Hu = 'HU',
  /** Indonesia */
  Id = 'ID',
  /** Ireland */
  Ie = 'IE',
  /** Israel */
  Il = 'IL',
  /** Isle of Man */
  Im = 'IM',
  /** India */
  In = 'IN',
  /** British Indian Ocean Territory */
  Io = 'IO',
  /** Iraq */
  Iq = 'IQ',
  /** Iran */
  Ir = 'IR',
  /** Iceland */
  Is = 'IS',
  /** Italy */
  It = 'IT',
  /** Jersey */
  Je = 'JE',
  /** Jamaica */
  Jm = 'JM',
  /** Jordan */
  Jo = 'JO',
  /** Japan */
  Jp = 'JP',
  /** Kenya */
  Ke = 'KE',
  /** Kyrgyzstan */
  Kg = 'KG',
  /** Cambodia */
  Kh = 'KH',
  /** Kiribati */
  Ki = 'KI',
  /** Comoros */
  Km = 'KM',
  /** Saint Kitts and Nevis */
  Kn = 'KN',
  /** North Korea */
  Kp = 'KP',
  /** South Korea */
  Kr = 'KR',
  /** Kuwait */
  Kw = 'KW',
  /** Cayman Islands */
  Ky = 'KY',
  /** Kazakhstan */
  Kz = 'KZ',
  /** Laos */
  La = 'LA',
  /** Lebanon */
  Lb = 'LB',
  /** Saint Lucia */
  Lc = 'LC',
  /** Liechtenstein */
  Li = 'LI',
  /** Sri Lanka */
  Lk = 'LK',
  /** Liberia */
  Lr = 'LR',
  /** Lesotho */
  Ls = 'LS',
  /** Lithuania */
  Lt = 'LT',
  /** Luxembourg */
  Lu = 'LU',
  /** Latvia */
  Lv = 'LV',
  /** Libya */
  Ly = 'LY',
  /** Morocco */
  Ma = 'MA',
  /** Monaco */
  Mc = 'MC',
  /** Moldova */
  Md = 'MD',
  /** Montenegro */
  Me = 'ME',
  /** Saint Martin (French part) */
  Mf = 'MF',
  /** Madagascar */
  Mg = 'MG',
  /** Marshall Islands */
  Mh = 'MH',
  /** North Macedonia */
  Mk = 'MK',
  /** Mali */
  Ml = 'ML',
  /** Myanmar */
  Mm = 'MM',
  /** Mongolia */
  Mn = 'MN',
  /** Macao */
  Mo = 'MO',
  /** Northern Mariana Islands */
  Mp = 'MP',
  /** Martinique */
  Mq = 'MQ',
  /** Mauritania */
  Mr = 'MR',
  /** Montserrat */
  Ms = 'MS',
  /** Malta */
  Mt = 'MT',
  /** Mauritius */
  Mu = 'MU',
  /** Maldives */
  Mv = 'MV',
  /** Malawi */
  Mw = 'MW',
  /** Mexico */
  Mx = 'MX',
  /** Malaysia */
  My = 'MY',
  /** Mozambique */
  Mz = 'MZ',
  /** Namibia */
  Na = 'NA',
  /** New Caledonia */
  Nc = 'NC',
  /** Niger */
  Ne = 'NE',
  /** Norfolk Island */
  Nf = 'NF',
  /** Nigeria */
  Ng = 'NG',
  /** Nicaragua */
  Ni = 'NI',
  /** Netherlands */
  Nl = 'NL',
  /** Norway */
  No = 'NO',
  /** Nepal */
  Np = 'NP',
  /** Nauru */
  Nr = 'NR',
  /** Niue */
  Nu = 'NU',
  /** New Zealand */
  Nz = 'NZ',
  /** Oman */
  Om = 'OM',
  /** Panama */
  Pa = 'PA',
  /** Peru */
  Pe = 'PE',
  /** French Polynesia */
  Pf = 'PF',
  /** Papua New Guinea */
  Pg = 'PG',
  /** Philippines */
  Ph = 'PH',
  /** Pakistan */
  Pk = 'PK',
  /** Poland */
  Pl = 'PL',
  /** Saint Pierre and Miquelon */
  Pm = 'PM',
  /** Pitcairn */
  Pn = 'PN',
  /** Puerto Rico */
  Pr = 'PR',
  /** Palestine, State of */
  Ps = 'PS',
  /** Portugal */
  Pt = 'PT',
  /** Palau */
  Pw = 'PW',
  /** Paraguay */
  Py = 'PY',
  /** Qatar */
  Qa = 'QA',
  /** Réunion */
  Re = 'RE',
  /** Romania */
  Ro = 'RO',
  /** Serbia */
  Rs = 'RS',
  /** Russia */
  Ru = 'RU',
  /** Rwanda */
  Rw = 'RW',
  /** Saudi Arabia */
  Sa = 'SA',
  /** Solomon Islands */
  Sb = 'SB',
  /** Seychelles */
  Sc = 'SC',
  /** Sudan */
  Sd = 'SD',
  /** Sweden */
  Se = 'SE',
  /** Singapore */
  Sg = 'SG',
  /** Saint Helena, Ascension and Tristan da Cunha */
  Sh = 'SH',
  /** Slovenia */
  Si = 'SI',
  /** Svalbard and Jan Mayen */
  Sj = 'SJ',
  /** Slovakia */
  Sk = 'SK',
  /** Sierra Leone */
  Sl = 'SL',
  /** San Marino */
  Sm = 'SM',
  /** Senegal */
  Sn = 'SN',
  /** Somalia */
  So = 'SO',
  /** Suriname */
  Sr = 'SR',
  /** South Sudan */
  Ss = 'SS',
  /** Sao Tome and Principe */
  St = 'ST',
  /** El Salvador */
  Sv = 'SV',
  /** Sint Maarten (Dutch part) */
  Sx = 'SX',
  /** Syria */
  Sy = 'SY',
  /** Eswatini */
  Sz = 'SZ',
  /** Turks and Caicos Islands */
  Tc = 'TC',
  /** Chad */
  Td = 'TD',
  /** French Southern Territories */
  Tf = 'TF',
  /** Togo */
  Tg = 'TG',
  /** Thailand */
  Th = 'TH',
  /** Tajikistan */
  Tj = 'TJ',
  /** Tokelau */
  Tk = 'TK',
  /** Timor-Leste */
  Tl = 'TL',
  /** Turkmenistan */
  Tm = 'TM',
  /** Tunisia */
  Tn = 'TN',
  /** Tonga */
  To = 'TO',
  /** Turkey */
  Tr = 'TR',
  /** Trinidad and Tobago */
  Tt = 'TT',
  /** Tuvalu */
  Tv = 'TV',
  /** Taiwan */
  Tw = 'TW',
  /** Tanzania */
  Tz = 'TZ',
  /** Ukraine */
  Ua = 'UA',
  /** Uganda */
  Ug = 'UG',
  /** United States Minor Outlying Islands */
  Um = 'UM',
  /** United States of America */
  Us = 'US',
  /** Uruguay */
  Uy = 'UY',
  /** Uzbekistan */
  Uz = 'UZ',
  /** Holy See */
  Va = 'VA',
  /** Saint Vincent and the Grenadines */
  Vc = 'VC',
  /** Venezuela */
  Ve = 'VE',
  /** Virgin Islands (British) */
  Vg = 'VG',
  /** Virgin Islands (U.S.) */
  Vi = 'VI',
  /** Vietnam */
  Vn = 'VN',
  /** Vanuatu */
  Vu = 'VU',
  /** Wallis and Futuna */
  Wf = 'WF',
  /** Samoa */
  Ws = 'WS',
  /** Yemen */
  Ye = 'YE',
  /** Mayotte */
  Yt = 'YT',
  /** South Africa */
  Za = 'ZA',
  /** Zambia */
  Zm = 'ZM',
  /** Zimbabwe */
  Zw = 'ZW'
}

/** An enumeration. */
export enum EventEventSyncTypeChoices {
  /** Audio track sync */
  AudioTime = 'AUDIO_TIME',
  /** Capture date & time */
  Datetime = 'DATETIME'
}

export type EventNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type EventObjectType = EventNode & {
  __typename?: 'EventObjectType';
  FinalVideosCount: Scalars['Int'];
  audioTrack?: Maybe<AudioObjectType>;
  /** Parent event - e.g. festival */
  childEvents: EventObjectTypeConnection;
  /** City */
  city: Scalars['String'];
  /** Country code */
  country: EventEventCountryChoices;
  created: Scalars['DateTime'];
  /** Event description */
  description?: Maybe<Scalars['String']>;
  /** Event end date and time */
  endTime: Scalars['DateTime'];
  /** Related event */
  eventvideoSet: EventVideoObjectTypeConnection;
  finalVideosCount?: Maybe<Scalars['Int']>;
  /** The ID of the object */
  id: Scalars['ID'];
  image?: Maybe<Scalars['FileUrl']>;
  /** Image height (readonly) */
  imgHeight?: Maybe<Scalars['Int']>;
  /** Image width (readonly) */
  imgWidth?: Maybe<Scalars['Int']>;
  /** Master video cut */
  masterCut?: Maybe<VideoCutObjectType>;
  members: Array<UserType>;
  modified: Scalars['DateTime'];
  /** Name of the event */
  name: Scalars['String'];
  /** Organizer of the event */
  organizer: EventOrganizerObjectType;
  /** Parent event - e.g. festival */
  parent?: Maybe<EventObjectType>;
  /** Produce a personalized cut for each user */
  personalizedCut: Scalars['Boolean'];
  preprocessingConfig: Scalars['JSONString'];
  /** Marks a private event */
  private: Scalars['Boolean'];
  renderingConfig: Scalars['JSONString'];
  /** Unique slug / hashtag */
  slug: Scalars['String'];
  /** Name of the stage (optional) */
  stage: Scalars['String'];
  /** Event start date and time */
  startTime: Scalars['DateTime'];
  /** Street and number */
  street: Scalars['String'];
  /** How the videos should be synchronised */
  syncType?: Maybe<EventEventSyncTypeChoices>;
  /** Name of the venue */
  venue: Scalars['String'];
  videoCutConfig: Scalars['JSONString'];
  videoCutsSet: VideoCutObjectTypeConnection;
  /** ZIP code */
  zip: Scalars['String'];
};


export type EventObjectTypeChildEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type EventObjectTypeEventvideoSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type EventObjectTypeVideoCutsSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type EventObjectTypeConnection = {
  __typename?: 'EventObjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EventObjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EventObjectType` and its cursor. */
export type EventObjectTypeEdge = {
  __typename?: 'EventObjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<EventObjectType>;
};

export type EventOrganizerObjectType = StandardNode & {
  __typename?: 'EventOrganizerObjectType';
  avatar?: Maybe<Scalars['FileUrl']>;
  avatarHeight?: Maybe<Scalars['Int']>;
  avatarWidth?: Maybe<Scalars['Int']>;
  created: Scalars['DateTime'];
  /** Organizer of the event */
  events: EventObjectTypeConnection;
  /** The ID of the object */
  id: Scalars['ID'];
  modified: Scalars['DateTime'];
  name: Scalars['String'];
  /** The event organizers this user belongs to. A user will get all permissions granted to each of their organizers. */
  users: Array<UserType>;
};


export type EventOrganizerObjectTypeEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type EventOrganizerObjectTypeConnection = {
  __typename?: 'EventOrganizerObjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EventOrganizerObjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EventOrganizerObjectType` and its cursor. */
export type EventOrganizerObjectTypeEdge = {
  __typename?: 'EventOrganizerObjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<EventOrganizerObjectType>;
};

export type EventVideoObjectType = StandardNode & {
  __typename?: 'EventVideoObjectType';
  created: Scalars['DateTime'];
  /** Marks a trashed item */
  deceased: Scalars['Boolean'];
  /** Related event */
  event: EventObjectType;
  file?: Maybe<Scalars['FileUrl']>;
  finalvideo?: Maybe<FinalVideoObjectType>;
  /** Format of the video file */
  format?: Maybe<MediaVideoFormatChoices>;
  /** Frame rate of the video */
  frameRate?: Maybe<Scalars['Float']>;
  /** The ID of the object */
  id: Scalars['ID'];
  /** Video length */
  length?: Maybe<Scalars['Time']>;
  mediaitemPtr: MediaObjectType;
  /** Optional JSON Meta-Data */
  metaData?: Maybe<Scalars['JSONString']>;
  modified: Scalars['DateTime'];
  /** Owner of the item */
  owner: UserType;
  personalize?: Maybe<Scalars['String']>;
  /** Video resolution in pixels */
  resolution?: Maybe<Array<Scalars['Int']>>;
  thumb?: Maybe<Scalars['FileUrl']>;
  /** Height of the thumbnail */
  thumbHeight: Scalars['Int'];
  /** Width of the thumbnail */
  thumbWidth: Scalars['Int'];
  /** Status of the upload */
  uploadStatus: MediaVideoUploadStatusChoices;
  /** Fraction of the uploaded chunks (between 0 and 1) */
  uploadedFraction: Scalars['Float'];
  uservideo?: Maybe<UserVideoObjectType>;
  videoPtr: VideoObjectType;
};

export type EventVideoObjectTypeConnection = {
  __typename?: 'EventVideoObjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EventVideoObjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EventVideoObjectType` and its cursor. */
export type EventVideoObjectTypeEdge = {
  __typename?: 'EventVideoObjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<EventVideoObjectType>;
};

export type FinalVideoNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type FinalVideoObjectType = FinalVideoNode & {
  __typename?: 'FinalVideoObjectType';
  created: Scalars['DateTime'];
  /** Marks a trashed item */
  deceased: Scalars['Boolean'];
  /** Related event */
  event: EventObjectType;
  eventvideoPtr: EventVideoObjectType;
  file?: Maybe<Scalars['FileUrl']>;
  /** Format of the video file */
  format?: Maybe<MediaVideoFormatChoices>;
  /** Frame rate of the video */
  frameRate?: Maybe<Scalars['Float']>;
  /** The ID of the object */
  id: Scalars['ID'];
  /** Video length */
  length?: Maybe<Scalars['Time']>;
  mediaitemPtr: MediaObjectType;
  /** Optional JSON Meta-Data */
  metaData?: Maybe<Scalars['JSONString']>;
  modified: Scalars['DateTime'];
  /** Owner of the item */
  owner: UserType;
  /** Marks a personalized video cut */
  personalize: Scalars['Boolean'];
  /** Video resolution in pixels */
  resolution?: Maybe<Array<Scalars['Int']>>;
  thumb?: Maybe<Scalars['FileUrl']>;
  /** Height of the thumbnail */
  thumbHeight: Scalars['Int'];
  /** Width of the thumbnail */
  thumbWidth: Scalars['Int'];
  /** Status of the upload */
  uploadStatus: MediaVideoUploadStatusChoices;
  /** Fraction of the uploaded chunks (between 0 and 1) */
  uploadedFraction: Scalars['Float'];
  videoCut?: Maybe<VideoCutObjectType>;
  videoPtr: VideoObjectType;
};

export type FinalVideoObjectTypeConnection = {
  __typename?: 'FinalVideoObjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<FinalVideoObjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `FinalVideoObjectType` and its cursor. */
export type FinalVideoObjectTypeEdge = {
  __typename?: 'FinalVideoObjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<FinalVideoObjectType>;
};

export type MeMutation = {
  __typename?: 'MeMutation';
  me?: Maybe<UserType>;
};

/** An enumeration. */
export enum MediaAudioFormatChoices {
  /** AAC */
  Aac = 'AAC',
  /** Aiff */
  Aiff = 'AIFF',
  /** Flac */
  Flac = 'FLAC',
  /** MP3 */
  Mp3 = 'MP3',
  /** MP4 */
  Mp4 = 'MP4',
  /** OGG */
  Ogg = 'OGG',
  /** WAV */
  Wav = 'WAV'
}

/** Base object type for all medias */
export type MediaObjectType = StandardNode & {
  __typename?: 'MediaObjectType';
  audio?: Maybe<AudioObjectType>;
  created: Scalars['DateTime'];
  /** Marks a trashed item */
  deceased: Scalars['Boolean'];
  /** The ID of the object */
  id: Scalars['ID'];
  /** Optional JSON Meta-Data */
  metaData?: Maybe<Scalars['JSONString']>;
  modified: Scalars['DateTime'];
  /** Owner of the item */
  owner: UserType;
  thumb?: Maybe<Scalars['FileUrl']>;
  /** Height of the thumbnail */
  thumbHeight: Scalars['Int'];
  /** Width of the thumbnail */
  thumbWidth: Scalars['Int'];
  video?: Maybe<VideoObjectType>;
};

/** An enumeration. */
export enum MediaUserVideoPlatformChoices {
  /** Android */
  Android = 'ANDROID',
  /** iOS */
  Ios = 'IOS'
}

/** An enumeration. */
export enum MediaVideoFormatChoices {
  /** AVCHD */
  Avchd = 'AVCHD',
  /** AVI */
  Avi = 'AVI',
  /** FLV */
  Flv = 'FLV',
  /** M4P */
  M4P = 'M4P',
  /** M4V */
  M4V = 'M4V',
  /** MOV */
  Mov = 'MOV',
  /** MP2 */
  Mp2 = 'MP2',
  /** MP4 */
  Mp4 = 'MP4',
  /** MPE */
  Mpe = 'MPE',
  /** MPEG */
  Mpeg = 'MPEG',
  /** MPG */
  Mpg = 'MPG',
  /** MPV */
  Mpv = 'MPV',
  /** OGG */
  Ogg = 'OGG',
  /** QT */
  Qt = 'QT',
  /** SWF */
  Swf = 'SWF',
  /** WebM */
  Webm = 'WEBM',
  /** WMV */
  Wmv = 'WMV'
}

/** An enumeration. */
export enum MediaVideoUploadStatusChoices {
  /** Created */
  Created = 'CREATED',
  /** Upload failed */
  UploadFailed = 'UPLOAD_FAILED',
  /** Upload finished */
  UploadFinished = 'UPLOAD_FINISHED',
  /** Upload started */
  UploadStarted = 'UPLOAD_STARTED'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** DEPRECATED! Use CreateUserVideo */
  createMyVideo?: Maybe<CreateMyVideo>;
  /** Creates a user video for given Event */
  createUserVideo?: Maybe<CreateUserVideo>;
  /** Creates a video chunk for given UserVideo */
  createVideoChunk?: Maybe<CreateVideoChunk>;
  /** Creates a video preview for given UserVideo */
  createVideoPreview?: Maybe<CreateVideoPreview>;
  registerMe?: Maybe<RegisterMe>;
  updateMe?: Maybe<MeMutation>;
  updateUserVideo?: Maybe<UpdateUserVideo>;
  updateVideoCut?: Maybe<VideoCutMutation>;
};


export type MutationCreateMyVideoArgs = {
  creationTime: Scalars['DateTime'];
  event: Scalars['String'];
  horizontal?: InputMaybe<Scalars['Boolean']>;
  platform?: InputMaybe<Scalars['String']>;
  thumb?: InputMaybe<Scalars['String']>;
  videoAttrs?: InputMaybe<VideoAttributesInput>;
};


export type MutationCreateUserVideoArgs = {
  creationTime: Scalars['DateTime'];
  event: Scalars['String'];
  horizontal?: InputMaybe<Scalars['Boolean']>;
  platform?: InputMaybe<Scalars['String']>;
  thumb?: InputMaybe<Scalars['String']>;
  videoAttrs?: InputMaybe<VideoAttributesInput>;
};


export type MutationCreateVideoChunkArgs = {
  backgroundUploaded?: InputMaybe<Scalars['Boolean']>;
  end: Scalars['Time'];
  file: Scalars['String'];
  parent: Scalars['UUID'];
  start: Scalars['Time'];
};


export type MutationCreateVideoPreviewArgs = {
  file?: InputMaybe<Scalars['String']>;
  parent: Scalars['UUID'];
  videoAttrs: VideoAttributesInput;
};


export type MutationRegisterMeArgs = {
  replace?: InputMaybe<Scalars['String']>;
  uid: Scalars['String'];
};


export type MutationUpdateMeArgs = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserVideoArgs = {
  file?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  thumb?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateVideoCutArgs = {
  cutDescription?: InputMaybe<Scalars['JSONString']>;
  id: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allVideos?: Maybe<EventVideoObjectTypeConnection>;
  audio?: Maybe<AudioObjectType>;
  audios?: Maybe<AudioObjectTypeConnection>;
  event?: Maybe<EventObjectType>;
  eventBySlug?: Maybe<EventObjectType>;
  featuredEvents?: Maybe<EventObjectTypeConnection>;
  finalVideo?: Maybe<FinalVideoObjectType>;
  finalVideos?: Maybe<FinalVideoObjectTypeConnection>;
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<UserType>;
  myEventOrganizers?: Maybe<EventOrganizerObjectTypeConnection>;
  myEvents?: Maybe<EventObjectTypeConnection>;
  myVideo?: Maybe<UserVideoObjectType>;
  myVideos?: Maybe<UserVideoObjectTypeConnection>;
  userVideo?: Maybe<UserVideoObjectType>;
  userVideos?: Maybe<UserVideoObjectTypeConnection>;
  videoChunks?: Maybe<Array<Maybe<VideoChunkObjectType>>>;
  videoCut?: Maybe<VideoCutObjectType>;
  videoCuts?: Maybe<VideoCutObjectTypeConnection>;
};


export type QueryAllVideosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryAudioArgs = {
  id: Scalars['UUID'];
};


export type QueryAudiosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryEventArgs = {
  id: Scalars['UUID'];
};


export type QueryEventBySlugArgs = {
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryFeaturedEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryFinalVideoArgs = {
  id: Scalars['UUID'];
};


export type QueryFinalVideosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMyEventOrganizersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMyEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryMyVideoArgs = {
  id: Scalars['UUID'];
};


export type QueryMyVideosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  videoCut?: InputMaybe<Scalars['UUID']>;
};


export type QueryUserVideoArgs = {
  id: Scalars['UUID'];
};


export type QueryUserVideosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  videoCut?: InputMaybe<Scalars['UUID']>;
};


export type QueryVideoChunksArgs = {
  parent?: InputMaybe<Scalars['String']>;
};


export type QueryVideoCutArgs = {
  id: Scalars['UUID'];
};


export type QueryVideoCutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type RegisterMe = {
  __typename?: 'RegisterMe';
  user?: Maybe<UserType>;
};

/** Standard node, uses DB id */
export type StandardNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type UpdateUserVideo = {
  __typename?: 'UpdateUserVideo';
  userVideo?: Maybe<UserVideoObjectType>;
};

export type UserType = {
  __typename?: 'UserType';
  avatar?: Maybe<Scalars['FileUrl']>;
  avatarHeight?: Maybe<Scalars['Int']>;
  avatarWidth?: Maybe<Scalars['Int']>;
  /** Email address of the user - unique system-wide */
  email: Scalars['String'];
  /** Firebase Auth UID */
  firebaseId: Scalars['String'];
  /** User's first name */
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  /** User's last name */
  lastName: Scalars['String'];
  /** True if the user is authenticated in Firebase */
  registered: Scalars['Boolean'];
};

export type UserVideoNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type UserVideoObjectType = UserVideoNode & {
  __typename?: 'UserVideoObjectType';
  created: Scalars['DateTime'];
  /** Time when the video was taken */
  creationTime?: Maybe<Scalars['DateTime']>;
  /** Marks a trashed item */
  deceased: Scalars['Boolean'];
  /** Related event */
  event: EventObjectType;
  eventvideoPtr: EventVideoObjectType;
  file?: Maybe<Scalars['FileUrl']>;
  /** Format of the video file */
  format?: Maybe<MediaVideoFormatChoices>;
  /** Frame rate of the video */
  frameRate?: Maybe<Scalars['Float']>;
  /** If True, video was taken on mobile horizontally */
  horizontal?: Maybe<Scalars['Boolean']>;
  /** The ID of the object */
  id: Scalars['ID'];
  /** Video length */
  length?: Maybe<Scalars['Time']>;
  mediaitemPtr: MediaObjectType;
  /** Optional JSON Meta-Data */
  metaData?: Maybe<Scalars['JSONString']>;
  modified: Scalars['DateTime'];
  /** Owner of the item */
  owner: UserType;
  /** Platform which was used when recording the video */
  platform?: Maybe<MediaUserVideoPlatformChoices>;
  /** Status of the pre-processing */
  preprocessed: Scalars['Boolean'];
  /** Result of the user video pre-processing */
  preprocessingData?: Maybe<Scalars['JSONString']>;
  preview?: Maybe<VideoPreviewObjectType>;
  /** Video resolution in pixels */
  resolution?: Maybe<Array<Scalars['Int']>>;
  thumb?: Maybe<Scalars['FileUrl']>;
  /** Height of the thumbnail */
  thumbHeight: Scalars['Int'];
  /** Width of the thumbnail */
  thumbWidth: Scalars['Int'];
  /** Status of the upload */
  uploadStatus: MediaVideoUploadStatusChoices;
  /** Fraction of the uploaded chunks (between 0 and 1) */
  uploadedFraction: Scalars['Float'];
  videoPtr: VideoObjectType;
};

export type UserVideoObjectTypeConnection = {
  __typename?: 'UserVideoObjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserVideoObjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `UserVideoObjectType` and its cursor. */
export type UserVideoObjectTypeEdge = {
  __typename?: 'UserVideoObjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<UserVideoObjectType>;
};

/** Attributes of the video */
export type VideoAttributesInput = {
  /** Video format e.g. MP4 */
  format?: InputMaybe<Scalars['String']>;
  /** Frames per second */
  frameRate?: InputMaybe<Scalars['Float']>;
  /** Length e.g. 00:23:22 */
  length?: InputMaybe<Scalars['String']>;
  /** Video resolution e.g. [300, 200] */
  resolution?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type VideoChunkNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type VideoChunkObjectType = VideoChunkNode & {
  __typename?: 'VideoChunkObjectType';
  /** True if chunk was uploaded in a background process */
  backgroundUploaded?: Maybe<Scalars['Boolean']>;
  created: Scalars['DateTime'];
  /** End time of the chunk */
  end: Scalars['Time'];
  file?: Maybe<Scalars['FileUrl']>;
  /** The ID of the object */
  id: Scalars['ID'];
  modified: Scalars['DateTime'];
  /** Parent video */
  parent: VideoObjectType;
  /** Start time of the chunk */
  start: Scalars['Time'];
};

export type VideoChunkObjectTypeConnection = {
  __typename?: 'VideoChunkObjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<VideoChunkObjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `VideoChunkObjectType` and its cursor. */
export type VideoChunkObjectTypeEdge = {
  __typename?: 'VideoChunkObjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<VideoChunkObjectType>;
};

export type VideoCutMutation = {
  __typename?: 'VideoCutMutation';
  videoCut?: Maybe<VideoCutObjectType>;
};

export type VideoCutNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type VideoCutObjectType = VideoCutNode & {
  __typename?: 'VideoCutObjectType';
  audioTracks?: Maybe<Array<Maybe<AudioObjectType>>>;
  created: Scalars['DateTime'];
  /** Detailed definition of the cut */
  cutDescription: Scalars['JSONString'];
  event: EventObjectType;
  /** Master video cut */
  eventsSet: EventObjectTypeConnection;
  finalvideoSet: FinalVideoObjectTypeConnection;
  /** The ID of the object */
  id: Scalars['ID'];
  masterCut?: Maybe<VideoCutObjectType>;
  modified: Scalars['DateTime'];
  /** Name of the event */
  name: Scalars['String'];
  /** Owner of the item */
  owner: UserType;
  videoCutConfig: Scalars['JSONString'];
  videocutSet: VideoCutObjectTypeConnection;
};


export type VideoCutObjectTypeEventsSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type VideoCutObjectTypeFinalvideoSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type VideoCutObjectTypeVideocutSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type VideoCutObjectTypeConnection = {
  __typename?: 'VideoCutObjectTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<VideoCutObjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `VideoCutObjectType` and its cursor. */
export type VideoCutObjectTypeEdge = {
  __typename?: 'VideoCutObjectTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<VideoCutObjectType>;
};

export type VideoObjectType = StandardNode & {
  __typename?: 'VideoObjectType';
  /** Parent video */
  chunks: VideoChunkObjectTypeConnection;
  created: Scalars['DateTime'];
  /** Marks a trashed item */
  deceased: Scalars['Boolean'];
  eventvideo?: Maybe<EventVideoObjectType>;
  file?: Maybe<Scalars['FileUrl']>;
  /** Format of the video file */
  format?: Maybe<MediaVideoFormatChoices>;
  /** Frame rate of the video */
  frameRate?: Maybe<Scalars['Float']>;
  /** The ID of the object */
  id: Scalars['ID'];
  /** Video length */
  length?: Maybe<Scalars['Time']>;
  mediaitemPtr: MediaObjectType;
  /** Optional JSON Meta-Data */
  metaData?: Maybe<Scalars['JSONString']>;
  modified: Scalars['DateTime'];
  /** Owner of the item */
  owner: UserType;
  /** Video resolution in pixels */
  resolution?: Maybe<Array<Scalars['Int']>>;
  thumb?: Maybe<Scalars['FileUrl']>;
  /** Height of the thumbnail */
  thumbHeight: Scalars['Int'];
  /** Width of the thumbnail */
  thumbWidth: Scalars['Int'];
  /** Status of the upload */
  uploadStatus: MediaVideoUploadStatusChoices;
  /** Fraction of the uploaded chunks (between 0 and 1) */
  uploadedFraction: Scalars['Float'];
  videopreview?: Maybe<VideoPreviewObjectType>;
};


export type VideoObjectTypeChunksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type VideoPreviewNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type VideoPreviewObjectType = VideoPreviewNode & {
  __typename?: 'VideoPreviewObjectType';
  created: Scalars['DateTime'];
  /** Marks a trashed item */
  deceased: Scalars['Boolean'];
  file?: Maybe<Scalars['FileUrl']>;
  /** Format of the video file */
  format?: Maybe<MediaVideoFormatChoices>;
  /** Frame rate of the video */
  frameRate?: Maybe<Scalars['Float']>;
  /** The ID of the object */
  id: Scalars['ID'];
  /** Video length */
  length?: Maybe<Scalars['Time']>;
  mediaitemPtr: MediaObjectType;
  /** Optional JSON Meta-Data */
  metaData?: Maybe<Scalars['JSONString']>;
  modified: Scalars['DateTime'];
  /** Owner of the item */
  owner: UserType;
  /** Parent UserVideo */
  parent: UserVideoObjectType;
  /** Video resolution in pixels */
  resolution?: Maybe<Array<Scalars['Int']>>;
  thumb?: Maybe<Scalars['FileUrl']>;
  /** Height of the thumbnail */
  thumbHeight: Scalars['Int'];
  /** Width of the thumbnail */
  thumbWidth: Scalars['Int'];
  /** Status of the upload */
  uploadStatus: MediaVideoUploadStatusChoices;
  /** Fraction of the uploaded chunks (between 0 and 1) */
  uploadedFraction: Scalars['Float'];
  videoPtr: VideoObjectType;
};

export type EventObjectTypeFragment = { __typename?: 'EventObjectType', created: any, id: string, name: string, slug: string, description?: string | null, private: boolean, startTime: any, endTime: any, image?: any | null, venue: string, stage: string, street: string, city: string, zip: string, FinalVideosCount: number, finalVideosCount?: number | null, organizer: { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> } };

export type EventOrganizerObjectTypeFragment = { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> };

export type EventVideoObjectTypeFragment = { __typename?: 'EventVideoObjectType', created: any, id: string, thumb?: any | null, file?: any | null, format?: MediaVideoFormatChoices | null, length?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, event: { __typename?: 'EventObjectType', id: string, name: string }, uservideo?: { __typename?: 'UserVideoObjectType', thumb?: any | null } | null, finalvideo?: { __typename?: 'FinalVideoObjectType', thumb?: any | null } | null };

export type FinalVideoObjectTypeFragment = { __typename?: 'FinalVideoObjectType', created: any, id: string, thumb?: any | null, file?: any | null, length?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, event: { __typename?: 'EventObjectType', created: any, id: string, name: string, slug: string, description?: string | null, private: boolean, startTime: any, endTime: any, image?: any | null, venue: string, stage: string, street: string, city: string, zip: string, FinalVideosCount: number, finalVideosCount?: number | null, organizer: { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> } } };

export type PageInfoFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null };

export type UserTypeFragment = { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string };

export type UserVideoObjectTypeFragment = { __typename?: 'UserVideoObjectType', created: any, id: string, thumb?: any | null, file?: any | null, length?: any | null, format?: MediaVideoFormatChoices | null, creationTime?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, event: { __typename?: 'EventObjectType', name: string }, preview?: { __typename?: 'VideoPreviewObjectType', thumb?: any | null } | null };

export type VideoObjectTypeFragment = { __typename?: 'VideoObjectType', created: any, id: string, thumb?: any | null, file?: any | null, format?: MediaVideoFormatChoices | null, length?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, eventvideo?: { __typename?: 'EventVideoObjectType', thumb?: any | null } | null };

export type VideoPreviewObjectTypeFragment = { __typename?: 'VideoPreviewObjectType', created: any, id: string, thumb?: any | null, file?: any | null, format?: MediaVideoFormatChoices | null, length?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, parent: { __typename?: 'UserVideoObjectType', created: any, id: string, thumb?: any | null, file?: any | null, length?: any | null, format?: MediaVideoFormatChoices | null, creationTime?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, event: { __typename?: 'EventObjectType', name: string }, preview?: { __typename?: 'VideoPreviewObjectType', thumb?: any | null } | null } };

export type CreateMyVideoMutationVariables = Exact<{
  creationTime: Scalars['DateTime'];
  event: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  videoAttrs: VideoAttributesInput;
}>;


export type CreateMyVideoMutation = { __typename?: 'Mutation', createMyVideo?: { __typename?: 'CreateMyVideo', userVideo?: { __typename?: 'UserVideoObjectType', id: string } | null } | null };

export type CreateVideoChunkMutationVariables = Exact<{
  backgroundUploaded?: InputMaybe<Scalars['Boolean']>;
  end: Scalars['Time'];
  file: Scalars['String'];
  parent: Scalars['UUID'];
  start: Scalars['Time'];
}>;


export type CreateVideoChunkMutation = { __typename?: 'Mutation', createVideoChunk?: { __typename?: 'CreateVideoChunk', videoChunk?: { __typename?: 'VideoChunkObjectType', file?: any | null } | null } | null };

export type CreateVideoPreviewMutationVariables = Exact<{
  file?: InputMaybe<Scalars['String']>;
  parent: Scalars['UUID'];
  videoAttrs: VideoAttributesInput;
}>;


export type CreateVideoPreviewMutation = { __typename?: 'Mutation', createVideoPreview?: { __typename?: 'CreateVideoPreview', videoPreview?: { __typename?: 'VideoPreviewObjectType', id: string, parent: { __typename?: 'UserVideoObjectType', id: string } } | null } | null };

export type RegisterMeMutationVariables = Exact<{
  uid: Scalars['String'];
  replace?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMeMutation = { __typename?: 'Mutation', registerMe?: { __typename: 'RegisterMe', user?: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string } | null } | null };

export type UpdateMeMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe?: { __typename?: 'MeMutation', me?: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string } | null } | null };

export type AllVideosQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  event?: InputMaybe<Scalars['UUID']>;
}>;


export type AllVideosQuery = { __typename?: 'Query', allVideos?: { __typename?: 'EventVideoObjectTypeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'EventVideoObjectTypeEdge', node?: { __typename?: 'EventVideoObjectType', created: any, id: string, thumb?: any | null, file?: any | null, format?: MediaVideoFormatChoices | null, length?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, event: { __typename?: 'EventObjectType', id: string, name: string }, uservideo?: { __typename?: 'UserVideoObjectType', thumb?: any | null } | null, finalvideo?: { __typename?: 'FinalVideoObjectType', thumb?: any | null } | null } | null } | null> } | null };

export type EventQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type EventQuery = { __typename?: 'Query', event?: { __typename?: 'EventObjectType', created: any, id: string, name: string, slug: string, description?: string | null, private: boolean, startTime: any, endTime: any, image?: any | null, venue: string, stage: string, street: string, city: string, zip: string, country: EventEventCountryChoices, FinalVideosCount: number, finalVideosCount?: number | null, organizer: { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> }, parent?: { __typename?: 'EventObjectType', created: any, id: string, name: string, slug: string, description?: string | null, private: boolean, startTime: any, endTime: any, image?: any | null, venue: string, stage: string, street: string, city: string, zip: string, FinalVideosCount: number, finalVideosCount?: number | null, organizer: { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> } } | null } | null };

export type EventBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type EventBySlugQuery = { __typename?: 'Query', eventBySlug?: { __typename?: 'EventObjectType', created: any, id: string, name: string, slug: string, description?: string | null, private: boolean, startTime: any, endTime: any, image?: any | null, venue: string, stage: string, street: string, city: string, zip: string, country: EventEventCountryChoices, FinalVideosCount: number, finalVideosCount?: number | null, organizer: { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> }, parent?: { __typename?: 'EventObjectType', created: any, id: string, name: string, slug: string, description?: string | null, private: boolean, startTime: any, endTime: any, image?: any | null, venue: string, stage: string, street: string, city: string, zip: string, FinalVideosCount: number, finalVideosCount?: number | null, organizer: { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> } } | null } | null };

export type FeaturedEventsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
}>;


export type FeaturedEventsQuery = { __typename?: 'Query', featuredEvents?: { __typename?: 'EventObjectTypeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'EventObjectTypeEdge', node?: { __typename?: 'EventObjectType', created: any, id: string, name: string, slug: string, description?: string | null, private: boolean, startTime: any, endTime: any, image?: any | null, venue: string, stage: string, street: string, city: string, zip: string, FinalVideosCount: number, finalVideosCount?: number | null, organizer: { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> } } | null } | null> } | null };

export type FinalVideosQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  event?: InputMaybe<Scalars['UUID']>;
}>;


export type FinalVideosQuery = { __typename?: 'Query', finalVideos?: { __typename?: 'FinalVideoObjectTypeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'FinalVideoObjectTypeEdge', node?: { __typename?: 'FinalVideoObjectType', created: any, id: string, thumb?: any | null, file?: any | null, length?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, event: { __typename?: 'EventObjectType', created: any, id: string, name: string, slug: string, description?: string | null, private: boolean, startTime: any, endTime: any, image?: any | null, venue: string, stage: string, street: string, city: string, zip: string, FinalVideosCount: number, finalVideosCount?: number | null, organizer: { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> } } } | null } | null> } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string } | null };

export type MyEventsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
}>;


export type MyEventsQuery = { __typename?: 'Query', featuredEvents?: { __typename?: 'EventObjectTypeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'EventObjectTypeEdge', node?: { __typename?: 'EventObjectType', created: any, id: string, name: string, slug: string, description?: string | null, private: boolean, startTime: any, endTime: any, image?: any | null, venue: string, stage: string, street: string, city: string, zip: string, FinalVideosCount: number, finalVideosCount?: number | null, organizer: { __typename?: 'EventOrganizerObjectType', id: string, name: string, avatar?: any | null, users: Array<{ __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }> } } | null } | null> } | null };

export type MyVideoQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type MyVideoQuery = { __typename?: 'Query', myVideo?: { __typename?: 'UserVideoObjectType', created: any, id: string, thumb?: any | null, length?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, event: { __typename?: 'EventObjectType', id: string, name: string } } | null };

export type MyVideosQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  event?: InputMaybe<Scalars['UUID']>;
}>;


export type MyVideosQuery = { __typename?: 'Query', myVideos?: { __typename?: 'UserVideoObjectTypeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'UserVideoObjectTypeEdge', node?: { __typename?: 'UserVideoObjectType', created: any, id: string, thumb?: any | null, file?: any | null, length?: any | null, format?: MediaVideoFormatChoices | null, creationTime?: any | null, owner: { __typename?: 'UserType', id: any, email: string, firstName: string, lastName: string, firebaseId: string }, event: { __typename?: 'EventObjectType', name: string }, preview?: { __typename?: 'VideoPreviewObjectType', thumb?: any | null } | null } | null } | null> } | null };
