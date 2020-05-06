import React from 'react';
import USD_icon from 'cryptocurrency-icons/svg/color/usd.svg';
import USDT_icon from 'cryptocurrency-icons/svg/color/usdt.svg';
import BTC_icon from 'cryptocurrency-icons/svg/color/btc.svg';
import ETH_icon from 'cryptocurrency-icons/svg/color/eth.svg';
import BNB_icon from 'cryptocurrency-icons/svg/color/bnb.svg';

const CryptoIcon = ({ ticker, width, height }) => {

    let imgSrc = '';
    let imgAlt = 'icon-';

    switch (ticker) {
        case 'USD': imgSrc = USD_icon; imgAlt = `${imgAlt + ticker}`; break;
        case 'USDT': imgSrc = USDT_icon; imgAlt = `${imgAlt + ticker}`; break;
        case 'BTC': imgSrc = BTC_icon; imgAlt = `${imgAlt + ticker}`; break;
        case 'ETH': imgSrc = ETH_icon; imgAlt = `${imgAlt + ticker}`; break;
        case 'BNB': imgSrc = BNB_icon; imgAlt = `${imgAlt + ticker}`; break;
        default: /* do nothing */ break;
    };

    return (
        <img src={imgSrc} alt={imgAlt} width={width} height={height} />
    );

};

export default CryptoIcon;
