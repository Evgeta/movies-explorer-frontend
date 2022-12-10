import { useEffect, useState } from 'react';

export function useScreenWidth() {
  
    const getScreenWidth = () => {
        return document.documentElement.clientWidth;
    };
      
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());
  
    useEffect(() => {
      const handleScreenResize = () => {
        setTimeout(() => {
          setScreenWidth(getScreenWidth());
        }, 1000);
      };

    //добавляем обработчик при монтировании      
    window.addEventListener('resize', handleScreenResize); 

    //удаляем обработчик при размонтировании    
    return () => window.removeEventListener('resize', handleScreenResize);

  }, []);

  return screenWidth;
}