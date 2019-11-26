import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../../basics/Button';
import Img from '../../../basics/Img/index';
import Alarm from '../../../assets/alarm.png';
import HeaderSearch from './HeaderSearch';

const HeaderRightContainer = styled.div`
    display: flex;
    justify-content: center;
    justify-items: center;
    /* margin-left: auto; */
    margin-right: 5rem;
`;

const LoginButton = styled(Button)`
    margin: auto;
    margin-left: 1rem;
    font-size: 0.8rem;
`;
const LoginLink = styled(Link)`
    width: 100%; 
    height: 100%;
    text-decoration : none;
`;
const Greeting = styled(Link)`
    margin-left:1rem;
    line-height : 4rem;
    text-decoration : none;
    color: black;    
`;

const AlarmImg = styled(Img)`
    margin-left: 1rem;
`;

const ProfileImg = styled(Img)`
    margin-left: 1rem;
`;

const DEFAULT_PROFILE_THUMBNAIL = 'https://kr.object.ncloudstorage.com/crafolio/user/thumbnail/user-profile-thumbnail.png';

const HeaderRight: React.FC = () => (
  <HeaderRightContainer>
    <HeaderSearch />
    <AlarmImg src={Alarm} />
    <LoginButton><LoginLink to="/login">로그인</LoginLink></LoginButton>
    <ProfileImg src={DEFAULT_PROFILE_THUMBNAIL} />
  </HeaderRightContainer>
);

export default HeaderRight;
