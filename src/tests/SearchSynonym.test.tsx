import { render, screen } from "@testing-library/react";
import React from "react";
import SearchSynonym from "../components/search-synonyms/SearchSynonym";

const mockUseSearchSynonym = jest.fn();

jest.mock("../hooks/search-synonym/useSearchSynonym", () => ({
  __esModule: true,
  useSearchSynonym: () => mockUseSearchSynonym(),
}));

describe("SearchSynonym Component", () => {
  let handleLookup: any;

  beforeEach(() => {
    handleLookup = jest.fn();
    mockUseSearchSynonym.mockReturnValue({
      synonyms: [],
      handleLookup,
      toastRef: React.createRef(),
    });
  });

  test("renders SearchSynonym form", () => {
    render(<SearchSynonym />);
    expect(screen.getByLabelText(/word/i)).toBeInTheDocument();
  });

  test("displays synonyms when available", () => {
    // Update the mock to return some synonyms
    mockUseSearchSynonym.mockReturnValueOnce({
      synonyms: ["example", "sample", "instance"],
      handleLookup,
      toastRef: React.createRef(),
    });

    render(<SearchSynonym />);

    // Check if the synonyms are rendered
    expect(screen.getByText("Synonyms:")).toBeInTheDocument();
    expect(screen.getByText("example")).toBeInTheDocument();
    expect(screen.getByText("sample")).toBeInTheDocument();
    expect(screen.getByText("instance")).toBeInTheDocument();
  });
});
