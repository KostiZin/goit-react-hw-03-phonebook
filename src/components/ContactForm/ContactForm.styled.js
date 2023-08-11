import { styled } from 'styled-components';
import { ErrorMessage, Form, Field } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 4px;
  width: 400px;
  padding: 24px;
  gap: 20px;
`;

export const StyledField = styled(Field)`
  display: flex;
  padding-left: 4px;
  margin: 8px 0;
`;

export const StyledError = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
`;

export const StyledButton = styled.button`
  background-image: linear-gradient(-180deg, #2d9148, #116327);
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  line-height: 40px;
`;
