import styled from '@emotion/styled';
import React from 'react';

export default ({
  children,
  image,
}) => {
  return <Wrapper>
    <TextWrapper>
      {children ?
        <Children>
          {children}
        </Children> :
        null}
    </TextWrapper>
    <img src={image} />
  </Wrapper>
};

const Children = styled.div`
  margin: 15px 0 0;
  font-size: 20px;
  * {
    font-weight: ${p => p.theme.textFontWeight};
  }
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
  text-shadow: 2px 2px 4px #000000;
`;

const Wrapper = styled.div`
  height: 100%;
  display: block;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  img {
    display: block;
    width: 100%;
  }
`;