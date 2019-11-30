import React from 'react';
import * as S from './styles';
import { CommentProp, CommentListProp } from './types';
import Like from '../../commons/Like';
import { getTime } from '../../utils';

const CommentList:React.FC<CommentListProp> = ({ owner, comment, createdAt }) => (
  <S.Comment>
    <S.CommentOwner>{owner}</S.CommentOwner>
    <S.CommentContent>{comment}</S.CommentContent>
    <S.CommentTimestamp>{createdAt}</S.CommentTimestamp>
    <S.Right>
      <Like initCount={10} />
    </S.Right>
  </S.Comment>
);

const Comment: React.FC<CommentProp> = ({
  comments, inputComment, changeInputHandler, addNewComment,
}) => (
  <S.CommentContainer>
    <S.CommentHeader>내 아이디 올 자리</S.CommentHeader>
    <S.CommentInput onChange={changeInputHandler} value={inputComment} />
    <S.CommentFooter>
      <S.Mention>멘션</S.Mention>
      <S.Mention>비밀 댓글</S.Mention>
      <S.SubmitButton onClick={addNewComment}>등록</S.SubmitButton>
    </S.CommentFooter>

    {comments.map((comment, idx) => (
      <CommentList
        owner="내이름"
        comment={comment.content}
        createdAt={getTime(comment.createdAt)}
        key={idx}
      />
    ))}
  </S.CommentContainer>
);

export default Comment;
