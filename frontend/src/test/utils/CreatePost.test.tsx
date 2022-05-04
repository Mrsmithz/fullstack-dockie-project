import { render, screen } from "@testing-library/react";
import CreatePost from "../../pages/createpost/index";
import Fab from "../../components/createpost/Fab";
import "@testing-library/jest-dom";

describe("Create Post Page", () => {
  it("render create post page", () => {
    render(<CreatePost />);
    const textTitle = screen.getByText(/Create Post/i);
    expect(textTitle).toBeInTheDocument();
  });

  it("render fab", () => {
    const fab = render(<Fab/>)
    expect(fab.getByRole("button")).toHaveAttribute("href", "/createpost")
  });

});
