import { afterEach, expect, test } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { TypingPad } from "../components/playground/typing-pad";

afterEach(cleanup);

test("each input keeps its own label and description when rendered twice", () => {
	// Given
	render(
		<>
			<TypingPad />
			<TypingPad />
		</>,
	);
	// When
	const inputs = screen.getAllByRole("textbox");
	// Then
	expect(new Set(inputs.map((input) => input.id)).size).toBe(2);
	for (const input of inputs) {
		const label = document.querySelector(`label[for="${input.id}"]`);
		expect(label).not.toBeNull();
		const description = input.getAttribute("aria-describedby");
		expect(description && document.getElementById(description)).toBeTruthy();
	}
});

test("does not render a reset action below the input", () => {
	render(<TypingPad />);
	expect(screen.queryByRole("button", { name: "비우기" })).toBeNull();
});
