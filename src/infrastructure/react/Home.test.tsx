import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Home } from "./Home";

afterEach(() => {
  for (const element of document.getElementsByTagName("html")) {
    element.innerHTML = "";
  }
});

it("renders", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <Home
        createDocument={async () => {}}
        documents={[]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={async () => {}}
      />
    );
  });

  await waitFor(() =>
    expect(result?.container.querySelector("textarea")).toBeTruthy()
  );

  expect(result?.container.firstChild).toMatchSnapshot();
});

it("creates a document", async () => {
  const createDocument = vi.fn(async () => {});
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <Home
        createDocument={createDocument}
        documents={[]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={async () => {}}
      />
    );
  });

  await waitFor(() =>
    expect(result?.container.querySelector("textarea")).toBeTruthy()
  );

  act(() => {
    fireEvent.change(
      result?.container.querySelector("textarea") as HTMLTextAreaElement,
      { target: { value: "foo" } }
    );

    fireEvent.click(result?.getByLabelText("Create") as Element);
  });

  expect(createDocument.mock.calls).toHaveLength(1);
});

it("updates a document", async () => {
  const updateDocument = vi.fn(async () => {});
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <Home
        createDocument={async () => {}}
        documents={[{ id: "", text: "" }]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={updateDocument}
      />
    );
  });

  await waitFor(() => expect(result?.getByLabelText("Edit")).toBeTruthy());

  act(() => {
    fireEvent.click(result?.getByLabelText("Edit") as Element);

    fireEvent.change(
      result?.container.querySelector("textarea") as HTMLTextAreaElement,
      { target: { value: "foo" } }
    );

    fireEvent.click(result?.getByLabelText("Save") as Element);
  });

  expect(updateDocument.mock.calls).toHaveLength(1);
});
