import styled from 'styled-components';

export const BadgeContainer = styled.div`
  display: grid;
  gap: 0.25rem;
  position: absolute;
  z-index: 10;
  left: -5px;
  top: 0.25rem;

  .badge {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(242, 242, 242);
    width: 4rem;
    background-color: teal;
    padding: 0.2rem;
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    overflow: unset;

    &:before {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 0px 5px 5px 0px;
      border-color: transparent darkcyan transparent transparent;
      bottom: -5px;
      left: 0px;
    }
  }
`;
