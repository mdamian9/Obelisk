import React from 'react';

const Logo = ({ width, height, className }) => {
    return (
        <img src='obelisk_01.png' alt='logo' className={className} width={width} height={height} />
    );
};

export default Logo;
