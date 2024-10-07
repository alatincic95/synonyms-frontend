import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useAddSynonym from "../hooks/add-synonym/useAddSynonym";
import AddSynonym from "../components/add-synonym/AddSynonym";

jest.mock("axios");
jest.mock("../hooks/add-synonym/useAddSynonym");

describe("AddSynonym Component", () => {
  const mockShow = jest.fn();
  const mockUseAddSynonym = {
    synonyms: [] as string[],
    setSynonyms: jest.fn(),
    handleSubmit: jest.fn(),
    toastRef: { current: { show: mockShow } },
  };

  beforeEach(() => {
    (useAddSynonym as jest.Mock).mockReturnValue(mockUseAddSynonym);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders AddSynonym form correctly", () => {
    render(<AddSynonym />);

    // Check for the presence of form elements
    expect(screen.getByLabelText(/Word:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter synonym:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Synonym/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("adds synonym on button click", async () => {
    render(<AddSynonym />);

    // Simulate user input
    const synonymInput = screen.getByLabelText(/Enter synonym:/i);
    fireEvent.change(synonymInput, { target: { value: "example" } });

    // Click the 'Add Synonym' button
    fireEvent.click(screen.getByRole("button", { name: /Add Synonym/i }));

    await waitFor(() => {
      // Check if setSynonyms was called with the correct value
      expect(mockUseAddSynonym.setSynonyms).toHaveBeenCalledWith(["example"]);
    });

    // Check if the input field is cleared
    expect(synonymInput).toHaveValue("");
  });

  test("shows warning toast if synonym already exists", async () => {
    mockUseAddSynonym.synonyms = ["example"] as string[];

    render(<AddSynonym />);

    const synonymInput = screen.getByLabelText(/Enter synonym:/i);
    fireEvent.change(synonymInput, { target: { value: "example" } });

    fireEvent.click(screen.getByRole("button", { name: /Add Synonym/i }));

    await waitFor(() => {
      expect(screen.getByText("Synonym already exists!")).toBeInTheDocument();
    });
  });
});
