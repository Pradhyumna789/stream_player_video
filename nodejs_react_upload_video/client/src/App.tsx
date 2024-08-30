import {VideoPlayer} from '6pp'
import { useState } from 'react';

const App = () => {

   const [quality, setQuality] = useState<number>(480);

  return (
     <div>
      <VideoPlayer src='http://localhost:3000/video' setQuality={setQuality}/>
        <video 
          style={{
            width: 500,
          }} 
        controls 
        src="http://localhost:3000/video" 
        muted>
     </video> 
     </div>
  );
};

export default App;
