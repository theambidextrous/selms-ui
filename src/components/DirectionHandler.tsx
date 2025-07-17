import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { langSelector } from '../stores/translation';

const DirectionHandler = () => {
  const currentLang = useSelector(langSelector);

  useEffect(() => {
    const isRtl = currentLang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  return null;
};

export default DirectionHandler;