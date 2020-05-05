import styled from '@emotion/styled';
import React from 'react';

export default ({
  title,
  children,
  image,
}) => {
  return <Wrapper>
    <TextWrapper>
      {title ?
        <Title>
          {title}
        </Title> :
        null}
      {children ?
        <Children>
          {children}
        </Children> :
        null}
    </TextWrapper>
    <img src={image} />
  </Wrapper>
};

const Title = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  line-height: calc(${p => p.theme.boxLabelSize} + 10px);
  height: calc(${p => p.theme.boxLabelSize} + 10px);
  font-size: ${p => p.theme.boxLabelSize};
`;

const Children = styled.div`
  margin: 15px 0 0;
  font-size: 20px;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 100%;
  display: block;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  img {
    display: block;
  }
`;