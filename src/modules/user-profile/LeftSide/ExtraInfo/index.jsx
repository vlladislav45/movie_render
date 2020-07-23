import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../../reducers/userReducer';
import ExtraInfoPair from './ExtraInfoPair';
import { ExtraInfoContainer } from './styles';

const ExtraInfo = props => {
  const dispatch = useDispatch();
  const userInfo = useSelector(({ userReducer: { user } }) => user.userInfo);

  function renderUserInfo() {
    return Object.keys(userInfo).map(key => {
      function updateInfo (newValue) {
        //TODO: Request to backend
        dispatch(updateUserData(key, newValue));
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
