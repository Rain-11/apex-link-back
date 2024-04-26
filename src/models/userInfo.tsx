import { useState } from 'react';

export default () => {
  const [changePasswordVerification, setChangePasswordVerification] = useState<boolean>(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('accountSecurity');
  return {
    changePasswordVerification,
    setChangePasswordVerification,
    activeTabKey,
    setActiveTabKey,
  };
};
