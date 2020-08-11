import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../../reducers/userReducer';
import ExtraInfoPair from './ExtraInfoPair';
import { ExtraInfoContainer } from './styles';

const ExtraInfo = props => {
  const dispatch = useDispatch();
  const { userInfo, userId } = useSelector(({ userReducer: { user }, auth: { loggedInUser } }) => ({
    userInfo: user.userInfo,
    userId: loggedInUser.userId,
  }));

  function renderUserInfo() {
    return Object.keys(userInfo).map(key => {
      if (typeof userInfo[key] !== 'string' && userInfo[key] !== null) return;
      function updateInfo (newValue) {
        //TODO: Request to backend
        dispatch(updateUserData(key, newValue, userId));
      }
      return (
        <ExtraInfoPair
          key={key} // they are unique
          pairKey={key}
          value={userInfo[key]}
          onChange={updateInfo}
        />
      )
    })
  }

  return (
    <ExtraInfoContainer>
      {renderUserInfo()}
    </ExtraInfoContainer>
  );
};

export default ExtraInfo;
