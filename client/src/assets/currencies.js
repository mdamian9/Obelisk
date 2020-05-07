import USD_icon from 'cryptocurrency-icons/svg/color/usd.svg';
import USDT_icon from 'cryptocurrency-icons/svg/color/usdt.svg';
import BTC_icon from 'cryptocurrency-icons/svg/color/btc.svg';
import ETH_icon from 'cryptocurrency-icons/svg/color/eth.svg';
import BNB_icon from 'cryptocurrency-icons/svg/color/bnb.svg';

const Currencies = {
    USD: {
        name: 'United States Dollar',
        ticker: 'USD',
        decimals: 4,
        icon: USD_icon
    },
    USDT: {
        name: 'Tether',
        ticker: 'USDT',
        decimals: 7,
        icon: USDT_icon
    },
    BTC: {
        name: 'Bitcoin',
        ticker: 'BTC',
        decimals: 8,
        icon: BTC_icon
    },
    ETH: {
        name: 'Ethereum',
        ticker: 'ETH',
        decimals: 8,
        icon: ETH_icon
    },
    BNB: {
        name: 'Binance Coin',
        ticker: 'BNB',
        decimals: 8,
        icon: BNB_icon
    }
};

export default Currencies;
