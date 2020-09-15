import { render, waitForDomChange } from "@testing-library/react";
import React from "react";
import { Simulate } from "react-dom/test-utils";
import { MarkdownTextArea } from "../MarkdownTextArea";

it("renders", () => {
  expect(
    render(
      <MarkdownTextArea
        insertFiles={async () => ""}
        onSubmit={async () => {}}
        setText={() => {}}
        text="foo"
      />
    ).container
  ).toMatchSnapshot();
});

it("pastes an image as a link", async () => {
  const setText = jest.fn();

  const { container } = render(
    <MarkdownTextArea
      insertFiles={async () => "result"}
      onSubmit={async () => {}}
      setText={setText}
      text="foo"
    />
  );

  // TODO: Use fireEvent.paste when it is fixed.
  Simulate.paste(
    container.firstElementChild as Element,
    {
      clipboardData: {
        items: [
          { getAsFile: () => new File([], "foo.png", { type: "image/png" }) },
        ],
      },
    } as never
  );

  await waitForDomChange({ container });

  expect(setText.mock.calls).toEqual([["result"]]);
});

it("does not paste anything if there is no clipboard data", async () => {
  const setText = jest.fn();

  const { container } = render(
    <MarkdownTextArea
      insertFiles={async () => "result"}
      onSubmit={async () => {}}
      setText={setText}
      text="foo"
    />
  );

  // TODO: Use fireEvent.paste when it is fixed.
  Simulate.paste(container.firstElementChild as Element, {} as any);

  await waitForDomChange({ container });

  expect(setText.mock.calls).toHaveLength(0);
});

it("does not paste anything if there is no images in clipboard data", async () => {
  const setText = jest.fn();

  const { container } = render(
    <MarkdownTextArea
      insertFiles={async () => "result"}
      onSubmit={async () => {}}
      setText={setText}
      text="foo"
    />
  );

  // TODO: Use fireEvent.paste when it is fixed.
  Simulate.paste(
    container.firstElementChild as Element,
    { clipboardData: { items: [] } } as any
  );

  await waitForDomChange({ container });

  expect(setText.mock.calls).toHaveLength(0);
});

it("drops an image as a link", async () => {
  const setText = jest.fn();

  const { container } = render(
    <MarkdownTextArea
      insertFiles={async () => "result"}
      onSubmit={async () => {}}
      setText={setText}
      text="foo"
    />
  );

  // TODO: Use fireEvent.drop when it is fixed.
  Simulate.drop(
    container.firstElementChild as Element,
    {
      dataTransfer: {
        files: [new File([], "foo.png", { type: "image/png" })],
      },
    } as any
  );

  await waitForDomChange({ container });

  expect(setText.mock.calls).toEqual([["result"]]);
});
