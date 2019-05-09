import React from "react";
import ReactMarkdown from "react-markdown";
import styled, { css } from "styled-components";

const Container = styled.div`
  cursor: text;

  > :first-child {
    margin-top: 0em;
  }

  > :last-child {
    margin-bottom: 0em;
  }

  * {
    word-wrap: break-word;
  }

  ${[1, 2, 3, 4, 5, 6].map(
    level => css`
      h${level} {
        font-size: 1em;

        &::before {
          content: "${"#".repeat(level)} ";
        }
      }
    `
  )};

  a {
    color: salmon;

    &:visited {
      color: salmon;
    }
  }

  pre,
  code {
    background: dimgrey;
    border-radius: 0.2rem;
    color: white;
    padding: 0.5em;
  }

  table {
    border-collapse: collapse;
  }

  table,
  td,
  th {
    border: 1px solid grey;
  }

  td,
  th {
    padding: 0.4em 0.6em;
  }
`;

interface IProps {
  children: string;
}

export const Markdown = ({ children }: IProps) => (
  <Container>
    <ReactMarkdown source={children} />
  </Container>
);
