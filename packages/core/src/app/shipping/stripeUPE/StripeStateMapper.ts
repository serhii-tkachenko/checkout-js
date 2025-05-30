interface StripeCountryMapping {
    [key: string]: StripeStateMapping;
}

interface StripeStateMapping {
    [key: string]: string;
}

export default function StripeStateMapper(
    country: string,
    state: string,
): string {

    const countries: StripeCountryMapping = {
        'MX': {
            'Ags.': 'AGU',
            'B.C.': 'BCN',
            'B.C.S.': 'BCS',
            'Camp.': 'CAM',
            'Coah.': 'COA',
            'Col.': 'COL',
            'Chis.': 'CHP',
            'Chih.': 'CHH',
            'Dgo.': 'DUR',
            'Gto.': 'GUA',
            'Gro.': 'GRO',
            'Hgo.': 'HID',
            'Jal.': 'JAL',
            'Méx.': 'MEX',
            'CDMX': 'MEX',
            'Mich.': 'MIC',
            'Mor.': 'MOR',
            'Nay.': 'NAY',
            'N.L.': 'NLE',
            'Oax.': 'OAX',
            'Pue.': 'PUE',
            'Qro.': 'QUE',
            'Q.R.': 'ROO',
            'S.L.P.': 'SLP',
            'Sin.': 'SIN',
            'Son.': 'SON',
            'Tab.': 'TAB',
            'Tamps.': 'TAM',
            'Tlax.': 'TLA',
            'Ver.': 'VER',
            'Yuc.': 'YUC',
            'Zac.': 'ZAC',
        },
        'AR': {
            'Ciudad Autónoma de Buenos Aires': 'C',
            'Buenos Aires': 'B',
            'Catamarca': 'K',
            'Chaco': 'H',
            'Chubut': 'U',
            'Córdoba': 'X',
            'Corrientes': 'W',
            'Entre Ríos': 'E',
            'Formosa': 'P',
            'Jujuy': 'Y',
            'La Pampa': 'L',
            'La Rioja': 'F',
            'Mendoza': 'M',
            'Misiones': 'N',
            'Neuquén': 'Q',
            'Salta': 'A',
            'San Juan': 'J',
            'San Luis': 'D',
            'Santa Fe': 'S',
            'Santiago del Estero': 'G',
            'Tierra del Fuego': 'V',
            'Tucumán': 'W',
        },
        'IN': {
            'Andhra Pradesh': 'AP',
            'Arunachal Pradesh': 'AR',
            'Assam': 'AS',
            'Bihar': 'BR',
            'Chhattisgarh': 'CG',
            'Goa': 'GA',
            'Gujarat': 'GJ',
            'Haryana': 'HR',
            'Himachal Pradesh': 'HP',
            'Jammu and Kashmir': 'JK',
            'Jharkhand': 'JH',
            'Karnataka': 'KA',
            'Kerala': 'KL',
            'Madhya Pradesh': 'MP',
            'Maharashtra': 'MH',
            'Manipur': 'MN',
            'Meghalaya': 'ML',
            'Mizoram': 'MZ',
            'Nagaland': 'NL',
            'Odisha': 'OR',
            'Punjab': 'PB',
            'Rajasthan': 'RJ',
            'Sikkim': 'SK',
            'Tamil Nadu': 'TN',
            'Tripura': 'TR',
            'Uttarakhand': 'UK',
            'Uttar Pradesh': 'UP',
            'West Bengal': 'WB',
            'Andaman and Nicobar Islands': 'AN',
            'Chandigarh': 'CH',
            'Dadra and Nagar Haveli and Daman and Diu': 'DN',
            'Lakshadweep': 'LD',
            'Delhi': 'DL',
            'Puducherry': 'PY',
            'Telangana': 'TS',
        },
        'ID': {
            'Bali': 'BA',
            'Banten': 'BT',
            'Bengkulu': 'BE',
            'Aceh': 'DA',
            'DKI Jakarta': 'JK',
            'Sumatera Utara': 'SU',
            'Sumatera Barat': 'SB',
            'Riau': 'SI',
            'Jambi': 'JA',
            'Sumatera Selatan': 'SS',
            'Lampung': 'LA',
            'Jawa Barat': 'JB',
            'Jawa Timur': 'JT',
            'Daerah Istimewa Yogyakarta': 'DY',
            'Kalimantan Barat': 'KB',
            'Kalimantan Tengah': 'KT',
            'Kalimantan Timur': 'KI',
            'Kalimantan Selatan': 'KS',
            'Nusa Tenggara Barat': 'NB',
            'Nusa Tenggara Timur': 'NT',
            'Sulawesi Selatan': 'SN',
            'Sulawesi Tengah': 'ST',
            'Sulawesi Utara': 'SA',
            'Sulawesi Tenggara': 'SG',
            'Maluku': 'MA',
            'Maluku Utara': 'MU',
            'Gorontalo': 'GO',
        },
        'MY': {
            'Johor': 'JHR',
            'Kedah': 'KDH',
            'Kelantan': 'KTN',
            'Melaka': 'MLK',
            'Negeri Sembilan': 'NSN',
            'Pahang': 'PHG',
            'Pulau Pinang': 'PNG',
            'Perak': 'PRK',
            'Perlis': 'PLS',
            'Selangor': 'SGR',
            'Terengganu': 'TRG',
            'Sabah': 'SBH',
            'Sarawak': 'SRW',
            'Kuala Lumpur': 'KUL',
            'Labuan': 'LBN',
            'Putrajaya': 'PJY',
        },
        'IE': {
            'Carlow': 'CW',
            'Cavan': 'CN',
            'Clare': 'CE',
            'Donegal': 'DL',
            'Dublin': 'D',
            'Galway': 'G',
            'Kildare': 'KE',
            'Kilkenny': 'KK',
            'Laois': 'LS',
            'Leitrim': 'LM',
            'Longford': 'LD',
            'Louth': 'LH',
            'Mayo': 'MO',
            'Meath': 'MH',
            'Monaghan': 'MN',
            'Offaly': 'OY',
            'Roscommon': 'RN',
            'Sligo': 'SO',
            'Tipperary': 'TA',
            'Waterford': 'WD',
            'Westmeath': 'WH',
            'Wexford': 'WX',
            'Wicklow': 'WW',
        },
        'JP': {
            'Aichi': '23',
            'Akita': '05',
            'Aomori': '02',
            'Chiba': '12',
            'Ehime': '38',
            'Fukui': '18',
            'Fukuoka': '40',
            'Fukushima': '07',
            'Gifu': '21',
            'Gunma': '10',
            'Hiroshima': '34',
            'Hokkaido': '01',
            'Hyogo': '28',
            'Ibaraki': '08',
            'Ishikawa': '17',
            'Iwate': '03',
            'Kagawa': '37',
            'Kagoshima': '46',
            'Kanagawa': '14',
            'Kochi': '39',
            'Kumamoto': '43',
            'Kyoto': '26',
            'Mie': '24',
            'Miyagi': '04',
            'Miyazaki': '45',
            'Nagano': '20',
            'Nagasaki': '42',
            'Nara': '29',
            'Niigata': '15',
            'Oita': '44',
            'Okayama': '33',
            'Okinawa': '47',
            'Osaka': '27',
            'Saga': '41',
            'Saitama': '11',
            'Shiga': '25',
            'Shimane': '32',
            'Shizuoka': '22',
            'Tochigi': '09',
            'Tokushima': '36',
            'Tokyo': '13',
            'Tottori': '31',
            'Toyama': '16',
            'Wakayama': '30',
            'Yamagata': '06',
            'Yamaguchi': '35',
            'Yamanashi': '19'
        },
    };

    if (countries[country]) {
        return countries[country][state] ?? getStripeState(countries[country], state);
    }

    return state;
}

function getStripeState(stateList: StripeStateMapping, state: string) {
    return Object.keys(stateList).find(key => stateList[key] === state) || state;
}
