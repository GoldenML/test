import React from 'react'

import backImg from '../../assets/img/backimg1.png'

export const BackGroundImgHeader = (props) => {
  return (<div style={{ backgroundImage: `url(${backImg})`, borderRadius: '4px', width: '98%', margin: '0 auto', height: '75px', color: 'white', textAlign: 'center', lineHeight: '80px', fontSize: '16px' }}>{props.title}</div>)
}
