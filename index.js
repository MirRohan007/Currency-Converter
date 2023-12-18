const code = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };

const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_qv2DVYx0lmmZXMlGRNMU4uSYRiuPX7VdXjweR7Ss&";

let select = document.querySelectorAll(".dropdown");
let toImg = document.querySelector("#to-img");
let fromImg = document.querySelector("#from-img");
let button = document.querySelector("#get");
let imageLink = "";
let message = document.querySelector("#message");

for (item in code){
    select.forEach((element) =>{
        let option = document.createElement("option")
        option.value = code[item];
        option.innerText = code[item];
        
        if(element.name == "from" && code[item] == "US"){
            option.selected = true;
        }
        else if(element.name == "to" && code[item] == "IN"){
            option.selected = true;
        }

        element.appendChild(option);
    })
}

select.forEach(element => {
    element.addEventListener("change", (event) => {
        updateImage(event.target);
    })
})

const updateImage = (target) => {
    imageLink = `https://flagcdn.com/48x36/${target.value.toLowerCase()}.png`;

    if(target.name == "from"){
        fromImg.src = imageLink;
    }
    else{
        toImg.src = imageLink;
    }
}

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#amount").value;
    if(amount == ""){
        message.style.display = "none";
        document.querySelector("#amount").focus()
        return;
    }
    let currency;
    let baseCurrency;
    for(item in code){
        if(code[item] == select[0].value){
            currency = item;
        }
        if(code[item] == select[1].value){
            baseCurrency = item;
        }
    };
    getCurrency(currency,baseCurrency);
})

const getCurrency = async (from,to) => {
    const URL = `${BASE_URL}currencies=${to}&base_currency=${from}`;

    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    let rate = data["data"][to]["value"];
    let amount = document.querySelector("#amount").value;

    let finalAmount = amount*rate;
    message.style.display = "block";
    message.innerText = `${amount} ${from} = ${finalAmount} ${to}`
}