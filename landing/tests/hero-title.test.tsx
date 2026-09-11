import { afterEach, expect, test } from "bun:test";
import { screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroTitle } from "../components/hero/hero-title";
import { classScopes } from "../styles/styles.css.ts";

afterEach(() => {
	document.body.replaceChildren();
});

test("keeps the opening title visible in server HTML before hydration", () => {
	// Given
	const markup = renderToStaticMarkup(<HeroTitle />);
	// When
	document.body.innerHTML = markup;
	const letters = document.querySelectorAll(`.${classScopes.heroTyped} > span`);
	// Then
	expect(letters.length).toBeGreaterThan(0);
	for (const letter of letters) {
		expect(getComputedStyle(letter).opacity).not.toBe("0");
	}
	expect(screen.getByRole("heading", { level: 1, name: "쓰던 한글, 끝까지." })).toBeTruthy();
	expect(document.querySelector(`.${classScopes.heroTyped}`)?.textContent).toBe("쓰던 한글,");
	expect(document.querySelector(`.${classScopes.heroInkLayer}`)?.textContent).toBe("끝까지.");
});
