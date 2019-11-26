import React from 'react';
import { Redirect } from 'react-router-dom';
import * as S from './style';

import NaverIcon from '../../assets/naver_login_white.png';
import CrafolioIcon from '../../assets/logo_white_larger.png';
import LoginInput from '../../basics/Input/LoginInput';
import PasswordInput from '../../basics/Input/PasswordInput';
import SubmitButton from '../../basics/SubmitButton';
import { LoginUserState } from '../../modules/login';

interface LoginProp{
    onLogin: (e: React.MouseEvent<HTMLButtonElement>)=>void;
    onChangeid: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    onChangepwd: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    id: string;
    pwd: string;
    LoginUser : LoginUserState;
}


const Login:React.FC<LoginProp> = ({
  onLogin, onChangeid, onChangepwd, id, pwd, LoginUser,
}) => (
  (LoginUser.isLogin)
    ? (<Redirect to="/" />)
    : (
      <S.LoginBox>
        <S.CrafolioLogoContainer>
          <S.CrafolioLogo src={CrafolioIcon} />
        </S.CrafolioLogoContainer>
        <LoginInput onChange={onChangeid} value={id} placeholder="이메일을 입력하세요" />
        <PasswordInput onChange={onChangepwd} value={pwd} placeholder="비밀번호를 입력하세요" />
        <SubmitButton onClick={onLogin}>로그인</SubmitButton>
        <S.LoginMidLine>
          <S.LoginLine />
      또는
          <S.LoginLine />
        </S.LoginMidLine>
        <S.OauthLine>
          <S.LoginNaverLogo src={NaverIcon} />
          <S.OauthContent>
        NAVER 으로 로그인
          </S.OauthContent>
        </S.OauthLine>
        <S.LoginMidLine>
          <S.JoinLink to="/join">계정이 없으시면 가입하세요</S.JoinLink>
        </S.LoginMidLine>
      </S.LoginBox>
    )
);

export default Login;
