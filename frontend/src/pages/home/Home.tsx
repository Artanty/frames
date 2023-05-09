import React, { ChangeEventHandler, useEffect, useState } from 'react';

import Search from './sections/Search';
import Folders from './sections/Folders';
import Recent from './sections/Recent';



export default function Home () {

  return (
    <div className='main'>
      <Search></Search>
      <Folders></Folders>
      <Recent></Recent>
    </div>
  );
}
