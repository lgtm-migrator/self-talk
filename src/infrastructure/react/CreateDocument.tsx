import React, { ChangeEvent, useState } from "react";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";
import { CircleButton } from "./CircleButton";
import { TextArea } from "./TextArea";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const OverwrappedTextArea = styled(TextArea)`
  margin-right: -1em;
`;

interface IProps {
  createDocument: (text: string) => Promise<void>;
}

export const CreateDocument = ({ createDocument }: IProps) => {
  const [text, setText] = useState("");

  return (
    <Container>
      <OverwrappedTextArea
        placeholder="Write in Markdown ..."
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setText(event.target.value)
        }
        value={text}
      />
      <CircleButton
        onClick={async () => {
          setText("");
          await createDocument(text);
        }}
      >
        <MdAdd />
      </CircleButton>
    </Container>
  );
};
